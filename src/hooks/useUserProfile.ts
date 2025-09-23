"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ----------------------
// Types
// ----------------------
export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

// ----------------------
// GET User Profile
// ----------------------
const fetchUserProfile = async (): Promise<UserProfile> => {
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
type UpdateUserProfileInput = Partial<
  Pick<UserProfile, "firstName" | "lastName" | "email">
>;

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
