export const dynamic = 'force-dynamic';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req) {
  noStore();
  await connectDB();
  
  const LoginHistory = (await import('@/models/LoginHistory')).default;
  const MarksLog = (await import('@/models/MarksLog')).default;

  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin')
    return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  const query = userId ? { userId } : {};
  const logins = await LoginHistory.find(query)
    .sort({ loginAt: -1 })
    .limit(100)
    .lean();

  const enriched = await Promise.all(logins.map(async (entry, i) => {
    const nextLoginEntry = logins.slice(i + 1).find(
      l => l.userId.toString() === entry.userId.toString()
    );
    const nextLogin = nextLoginEntry
      ? nextLoginEntry.loginAt
      : new Date(entry.loginAt.getTime() + 24 * 60 * 60 * 1000);
    const changes = await MarksLog.countDocuments({
      editedBy: entry.userId,
      editedAt: { $gte: entry.loginAt, $lt: nextLogin },
    });
    return { ...entry, changesCount: changes };
  }));

  return Response.json(enriched);
}