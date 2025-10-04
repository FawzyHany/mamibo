// components/DashboardButton.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function DashboardButton() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch('/api/check-role');
        const data = await response.json();
        setHasAccess(data.hasAccess);
      } catch (error) {
        console.error('Failed to check role:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (loading) return null; // or loading spinner
  if (!hasAccess) return null;

  return (
    <Link 
      href="/dashboard" 
      className="inline-block px-4 py-2 mb-4 bg-[var(--primary-color2)] text-white rounded font-bold w-full text-center"
    >
      Dashboard
    </Link>
  );
}