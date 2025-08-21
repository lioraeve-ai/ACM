import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ACM Cryptic Coven',
  description: 'A mystical challenge for the members of ACM Dubai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=JetBrains+Mono:wght@400&family=Creepster&family=Roboto+Mono:wght@500&family=Literata:wght@600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "font-body antialiased min-h-screen bg-background"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
