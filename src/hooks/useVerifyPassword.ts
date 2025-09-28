// hooks/useVerifyPassword.ts
import { useMutation } from "@tanstack/react-query";
export async function verifyPassword(password: string) {
  const res = await fetch("/api/auth/verify-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to verify password");
  return res.json() as Promise<{ valid: boolean }>;
}

export function useVerifyPassword() {
  return useMutation({
    mutationFn: verifyPassword,
  });
}
