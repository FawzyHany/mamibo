import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound(); // This triggers [locale]/not-found.tsx
}