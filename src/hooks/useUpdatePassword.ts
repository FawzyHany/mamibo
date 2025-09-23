// hooks/useUpdatePassword.ts
import { useMutation } from "@tanstack/react-query";

async function updatePassword(input: { currentPassword: string; newPassword: string }) {
  const res = await fetch("/api/user/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to update password");
  }

  return res.text();
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePassword,
  });
}
