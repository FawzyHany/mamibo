import React from 'react'
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditProfileForm from '@/components/EditProfile/EditProfileForm';
import { useTranslations } from 'next-intl';

export const ProfileSection = () => {
  const t = useTranslations();
  const { data: profile, isLoading, error } = useUserProfile();
  const [editing, setEditing] = useState(false);

  if (isLoading) return <p>{t("account.loadingprofile")}</p>;
  if (error) {
    console.error("Profile fetch error:", error);
    return <p className="text-red-500">Failed to load profile</p>;
  }
  if (!profile) return <p>{t("account.noprofile")}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("account.profileinfo")}</CardTitle>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <>
            <p>
            {t("ContactUsForm.name")}: {profile.firstName} {profile.lastName}
            </p>
            <p>{t("ContactUsForm.email")}: {profile.email}</p>
            <Button className="mt-4" onClick={() => setEditing(true)}>
            {t("account.edit")}
            </Button>
          </>
        ) : (
          <EditProfileForm profile={profile} onClose={() => setEditing(false)} />
        )}
      </CardContent>
    </Card>
  );
}
