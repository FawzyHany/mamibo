// app/[locale]/login/page.tsx
"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useSearchParams } from "next/navigation"


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
  .min(8, "Password must be at least 8 characters")
})

type LoginFormValues = z.infer<typeof loginSchema>

// ... (imports and schema remain the same) ...

export default function LoginPage() {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  
  useEffect(() => {
    if (error === "CredentialsSignin") {
      setFormError("Invalid email or password")
    }
  }, [error])


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      console.log("👈Calling signIn with credentials..."); // 👈 New log
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      console.log("👈Response from signIn:", res); // 👈 New log

      if (res?.error) {
        console.log("👈signIn returned an error:", res.error); // 👈 New log
        // Next-Auth returns a generic 'CredentialsSignin' error for invalid credentials
        // Use a more user-friendly message
        throw new Error("Invalid email or password");
      }
      console.log("👈signIn was successful."); // 👈 New log
      return res;
    },
    onSuccess: () => {
      console.log("👈Mutation successful. Redirecting..."); // 👈 New log
      router.push("/");
    },
    onError: (err: Error) => {
      console.log("👈Mutation failed. Handling error locally:", err.message); // 👈 New log
      // The error message from the mutationFn is used here
      setFormError(err.message);
      console.error("Login failed:", err.message);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setFormError(""); // Clear previous errors on new submission
    loginMutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jsmith@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Display the error message here */}
              {formError && <p className="text-red-500 text-sm">{formError}</p>} 
              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}