'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useSubmitContact } from '@/hooks/useSubmitContact';

// ✅ Schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const {
    mutate: submitContact,
    isPending,
    isSuccess,
  } = useSubmitContact();

  const onSubmit = (data: ContactFormData) => {
    submitContact(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6 max-w-xl mx-auto')}
    >
      <div>
        <Input className="bg-white" placeholder="Name" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input className="bg-white" placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input className="bg-white" placeholder="Phone (optional)" {...register('phone')} />
      </div>

      <div>
        <Textarea
          className="bg-white"
          placeholder="Your message"
          rows={4}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>

      {isSuccess && (
        <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
      )}
    </form>
  );
}
