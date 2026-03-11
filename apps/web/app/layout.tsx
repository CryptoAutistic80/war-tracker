import type { ReactNode } from 'react';
import './globals.css';
import '../components/ui/ui.css';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh' }}>{children}</div>
      </body>
    </html>
  );
}
