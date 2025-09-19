'use client'
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import React from 'react'

export default function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()

  // Derive current locale from URL path segment
  const currentLocale = pathname.split('/')[1] || 'en';
  const toggleLocale = currentLocale === 'en' ? 'ar' : 'en';

  const handleClick = () => {
    const segments = pathname.split("/")
    segments[1] = toggleLocale
    const newPath = segments.join("/")
    router.push(newPath)
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      {currentLocale==='en'?"عربي":"en"}
    </Button>
  )
}
