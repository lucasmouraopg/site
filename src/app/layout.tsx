import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucasmourao.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'LUCAS MOURÃO - PRÉ CANDIDATO A DEPUTADO ESTADUAL',
  description: 'RAIZES QUE MOLDAM UM NOVO TEMPO',
  keywords: [
    'Lucas Mourão',
    'Deputado Estadual',
    'Praia Grande',
    'São Paulo',
    'Política',
    'Alberto Mourão',
  ],
  authors: [{ name: 'Lucas Mourão' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://lucasmourao.com.br',
    siteName: 'Lucas Mourão',
    title: 'LUCAS MOURÃO - PRÉ CANDIDATO A DEPUTADO ESTADUAL',
    description: 'RAIZES QUE MOLDAM UM NOVO TEMPO',
    images: [
      {
        url: '/assets/images/og/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lucas Mourão',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUCAS MOURÃO - PRÉ CANDIDATO A DEPUTADO ESTADUAL',
    description: 'RAIZES QUE MOLDAM UM NOVO TEMPO',
    images: ['/assets/images/og/og-image.jpg'],
  },
  icons: {
    icon: '/assets/images/logo/favicon.png',
    shortcut: '/assets/images/logo/favicon.png',
    apple: '/assets/images/logo/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/images/logo/favicon.png" sizes="any" />
        <link rel="shortcut icon" href="/assets/images/logo/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/images/logo/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
