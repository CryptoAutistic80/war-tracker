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
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="page-root">{children}</div>
      </body>
    </html>
  );
}
