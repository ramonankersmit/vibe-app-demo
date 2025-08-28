'use client';

import { signOut, useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <nav className="bg-white border-b mb-4">
      <div className="container mx-auto flex justify-end p-4">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-gray-700 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
