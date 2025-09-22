// hooks/useSignup.ts
"use client";

import { useMutation } from "@tanstack/react-query";

type SignupInput = {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
};

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupInput) => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      return res.json();
    },
  });
}
