"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserSchema } from "@/app/api/user/route";
import z from "zod";

// ----------------------
// Types
// ----------------------

export type UserProfile = z.infer<typeof UpdateUserSchema>;
// ----------------------
// GET User Profile
// ----------------------
const fetchUserProfile = async (): Promise< UserProfile> => {
  const res = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ⬅️ important for cookies/session
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};

export function useUserProfile() {
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
}

// ----------------------
// PATCH User Profile
// ----------------------
export type UpdateUserProfileInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const updateUserProfile = async (updates: UpdateUserProfileInput) => {
  const res = await fetch("/api/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ⬅️ include cookies/session
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update user profile");
  }

  return res.json();
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
