import { Link } from 'lucide-react';
import React from 'react'

export default function NotFound() {
  return (
    <main className="not-found h-[50vh] flex justify-center items-center flex-col">
      <h1>404–Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn&apos;t exist.</p>
    <Link>  <a href="/" className='underline text-blue-500'>Go back home</a></Link>
    </main>
  );
}
