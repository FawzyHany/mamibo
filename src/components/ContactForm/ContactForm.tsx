'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // if you're using cn helper

// ✅ 1. Define schema with Zod
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

// ✅ 2. Create TypeScript type from schema
type ContactFormData = z.infer<typeof contactSchema>;

// ✅ 3. Component
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Submitted:', data);

    // simulate async submit
    setTimeout(() => {
      reset(); // Clear form after successful submission
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6 max-w-xl mx-auto ')}
    >
      <div>
        <Input className='bg-white' placeholder="Name" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input className='bg-white' placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input className='bg-white' placeholder="Phone (optional)" {...register('phone')} />
      </div>

      <div>
        <Textarea
        className='bg-white'
          placeholder="Your message"
          rows={4}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {isSubmitSuccessful && (
        <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
      )}
    </form>
  );
}
