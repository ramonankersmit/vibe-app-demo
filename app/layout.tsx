import './globals.css';
import AuthProvider from '../components/AuthProvider';
import NavBar from '../components/NavBar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Vibe App Demo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
