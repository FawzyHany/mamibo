import React from 'react'
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import EditProfileForm from '../EditProfile/EditProfileForm';

export const ProfileSection = () => {
  const { data: profile, isLoading, error } = useUserProfile();
  const [editing, setEditing] = useState(false);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) {
    console.error("Profile fetch error:", error);
    return <p className="text-red-500">Failed to load profile</p>;
  }
  if (!profile) return <p>No profile found</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <>
            <p>
              Name: {profile.firstName} {profile.lastName}
            </p>
            <p>Email: {profile.email}</p>
            <Button className="mt-4" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </>
        ) : (
          <EditProfileForm profile={profile} onClose={() => setEditing(false)} />
        )}
      </CardContent>
    </Card>
  );
}
