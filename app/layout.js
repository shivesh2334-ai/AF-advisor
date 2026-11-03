import './globals.css';

export const metadata = {
  title: 'AF Expert | Atrial Fibrillation Management',
  description: 'AI-powered clinical decision support for AF management based on NICE guidelines',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ '--font-display': 'Georgia, serif', '--font-body': 'Arial, sans-serif', '--font-mono': 'monospace' }}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
