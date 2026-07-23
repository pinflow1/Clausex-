import './globals.css';
import { APP_NAME, APP_TAGLINE } from '@/lib/brand';

export const metadata = {
  title: APP_NAME,
  description: APP_TAGLINE,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
