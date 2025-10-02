
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Contact } from '@prisma/client';

type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export function useSubmitContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit message');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useContacts() {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to load messages');
      return res.json();
    },
  });
}
