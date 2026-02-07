import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'A Letter of expression for you',
  description: 'Express your love with a beautiful digital letter',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
