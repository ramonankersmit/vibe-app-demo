import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = new Map([
  ['ondernemer@example.com', { email: 'ondernemer@example.com', password: 'demo123', role: 'ondernemer' }],
  ['notaris@example.com', { email: 'notaris@example.com', password: 'demo123', role: 'notaris' }],
  ['admin@example.com', { email: 'admin@example.com', password: 'demo123', role: 'admin' }],
]);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = users.get(credentials.email);
        if (
          user &&
          user.password === credentials.password &&
          user.role === credentials.role
        ) {
          return { email: user.email, role: user.role } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.email = (user as any).email;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
