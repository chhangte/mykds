import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { unstable_noStore as noStore } from 'next/cache';

const nextAuth = NextAuth.default || NextAuth;

export async function GET(req, res) {
  noStore();
  return nextAuth(authOptions)(req, res);
}

export async function POST(req, res) {
  noStore();
  return nextAuth(authOptions)(req, res);
}

export const dynamic = "force-dynamic";