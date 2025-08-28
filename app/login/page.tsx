'use client';

import { useState, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ondernemer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) {
    router.replace('/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError('Ongeldige inloggegevens');
    } else if (res?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm">
            Wachtwoord
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1 text-sm">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="ondernemer">ondernemer</option>
            <option value="notaris">notaris</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Bezig...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
