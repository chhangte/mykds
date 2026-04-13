import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'myKDS - Kids Den School',
  description: 'School Management Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
