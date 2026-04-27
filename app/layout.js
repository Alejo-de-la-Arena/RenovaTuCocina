import { Montserrat, DM_Sans, Great_Vibes } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

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
  icons: {
    icon: [{ url: 'https://res.cloudinary.com/dasch1s5i/image/upload/v1776964613/RTC-logo_s0br3r.png' }],
    shortcut: ['https://res.cloudinary.com/dasch1s5i/image/upload/v1776964613/RTC-logo_s0br3r.png'],
    apple: [{ url: 'https://res.cloudinary.com/dasch1s5i/image/upload/v1776964613/RTC-logo_s0br3r.png' }],
  },
  openGraph: {
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${dmSans.variable} ${greatVibes.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans min-h-screen flex flex-col"
      >
        {/* noscript GTM — lo primero dentro del body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9JR9VH4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Script GTM — va al final del body, Next lo maneja solo */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K9JR9VH4');`,
          }}
        />
      </body>
    </html>
  );
}