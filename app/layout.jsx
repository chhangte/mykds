import { getServerSession } from 'next-auth';
import Navbar from '@/components/Navbar';
import Providers from './providers';
import './globals.css';

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Providers>
          {session && <Navbar role={session.user?.role} name={session.user?.name} />}
          <main style={{ paddingTop: session ? '60px' : 0 }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}