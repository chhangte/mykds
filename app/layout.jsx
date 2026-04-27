import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {

  metadataBase: new URL('https://my.kidsdenschool.in'),

  title: {
    default: 'myKDS - Kids Den School',
    template: '%s | myKDS',
  },

  description: 'Academic Management System',

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'myKDS - Kids Den School',
    description: 'Academic Management System',
    url: 'https://my.kidsdenschool.in',
    siteName: 'myKDS',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'myKDS - Kids Den School Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'myKDS - Kids Den School',
    description: 'Academic Management System',
    images: ['/banner.png'],
  },

  alternates: {
    canonical: 'https://my.kidsdenschool.in',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
