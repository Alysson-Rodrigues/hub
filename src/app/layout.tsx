import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Base_Neue, Dalek } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Links | Alysson Rodrigues',
  description: 'Meus links e contato',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-wide', Base_Neue, Dalek)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
