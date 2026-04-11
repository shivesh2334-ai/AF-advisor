import { DM_Serif_Display, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], variable: '--font-display' });
const body = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });

export const metadata = {
  title: 'AF Expert | Atrial Fibrillation Management',
  description: 'AI-powered clinical decision support for AF management based on NICE guidelines',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
