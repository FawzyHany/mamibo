// hooks/useUserAddress.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserAddress, UserAddressInput } from "@/lib/schemas";


export async function fetchUserAddresses(): Promise<UserAddress[]> {
  const res = await fetch("/api/user-address", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
}

export async function createUserAddress(data: UserAddressInput) {
  const res = await fetch("/api/user-address", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to create address");
  return res.json();
}

export async function updateUserAddress(id: string, data: Partial<UserAddressInput>) {
  const res = await fetch(`/api/user-address/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update address");
  return res.json();
}

export async function deleteUserAddress(id: string) {
  const res = await fetch(`/api/user-address/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete address");
  return res.json();
}


// GET all addresses
export function useUserAddresses() {
  return useQuery<UserAddress[]>({
    queryKey: ["userAddresses"],
    queryFn: fetchUserAddresses,
  });
}

// CREATE address
export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
  });
}

// UPDATE address
export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserAddressInput> }) =>
      updateUserAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
  });
}

// DELETE address
export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
  });
}
