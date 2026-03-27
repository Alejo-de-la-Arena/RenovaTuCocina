import { Montserrat, DM_Sans, Great_Vibes } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Renová Tu Cocina | MDV Proyectos',
    template: '%s | Renová Tu Cocina',
  },
  description:
    'Diseño, fabricación e instalación de cocinas a medida. Renovación integral o cocina desde cero. Zona norte y CABA. Antes y después reales.',
  keywords: ['cocinas', 'renovación', 'diseño', 'MDV', 'cocina a medida', 'zona norte'],
  authors: [{ name: 'MDV Proyectos' }],
  openGraph: {
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${dmSans.variable} ${greatVibes.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
