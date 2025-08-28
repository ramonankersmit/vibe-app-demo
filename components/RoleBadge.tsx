'use client';

const colors: Record<string, string> = {
  ondernemer: 'bg-blue-100 text-blue-800',
  notaris: 'bg-green-100 text-green-800',
  admin: 'bg-red-100 text-red-800',
};

export default function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[role] ?? 'bg-gray-100 text-gray-800'}`}>
      {role}
    </span>
  );
}
