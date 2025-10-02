"use client";

import { useState } from "react";
import { useUpdateProfile } from "@/hooks/useUserProfile";
import { useVerifyPassword } from "@/hooks/useVerifyPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UserProfile } from "@/hooks/useUserProfile";
import { useTranslations } from "next-intl";

type EditProfileFormProps = {
  profile: UserProfile;
  onClose: () => void;
};

export default function EditProfileForm({ profile, onClose }: EditProfileFormProps) {
  const t =useTranslations();
  const [form, setForm] = useState(profile);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const updateProfile = useUpdateProfile();
  const verifyPassword = useVerifyPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: verify password
      const res = await verifyPassword.mutateAsync(password);
      if (!res.valid) {
        setError("Incorrect password. Try again.");
        return;
      }

      // Step 2: update profile
      await updateProfile.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });

      alert("Profile updated successfully!");
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error:", err);
      }
    
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{t("account.editprofile")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* First name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("ContactUsForm.firstname")}</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="First name"
            />
          </div>

          {/* Last name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">{t("ContactUsForm.lastname")}</Label>
            <Input
              id="lastName"
              value={form.lastName || ""}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder={t("ContactUsForm.lastname")}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("ContactUsForm.email")}</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("ContactUsForm.email")}
            />
          </div>

          {/* Password confirmation */}
          <div className="space-y-2">
            <Label htmlFor="password">{t("account.confirmpassword")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("account.password")}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>

        <CardFooter className="flex gap-2 m-3">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={updateProfile.isPending || verifyPassword.isPending}
          >
            {updateProfile.isPending || verifyPassword.isPending
              ? t("account.saving")
              : t("account.save")}
          </Button>
          <Button className="cursor-pointer" type="button" variant="outline" onClick={onClose}>
           {t("account.cancel")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
