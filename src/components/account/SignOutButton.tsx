import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        signOut({ callbackUrl: "/" }) // redirect to home after logout
      }
    >
      Sign Out
    </Button>
  );
}
