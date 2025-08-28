import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import RoleBadge from '@/components/RoleBadge';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;

  let message = '';
  switch (role) {
    case 'ondernemer':
      message = 'Welkom ondernemer — start je oprichtingsdossier hier.';
      break;
    case 'notaris':
      message = 'Welkom notaris — je hebt nog geen dossiers toegewezen.';
      break;
    case 'admin':
      message = 'Welkom admin — beheer en audit.';
      break;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        Ingelogd als: <RoleBadge role={role} />
      </h1>
      <p>{message}</p>
    </div>
  );
}
