import type { Metadata, Viewport } from 'next';
import './globals.css';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import SpotlightEffect from '@/components/SpotlightEffect';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import StructuredData from '@/components/StructuredData';
import { SITE_METADATA } from '@/lib/constants';

export const viewport: Viewport = {
  themeColor: '#080B11',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | NEXA Digital`,
  },
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.siteUrl }],
  creator: SITE_METADATA.author,
  publisher: SITE_METADATA.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.siteUrl,
    siteName: 'NEXA Digital',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'NEXA Digital — Atração Local & Multiatendimento no WhatsApp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: ['/logo.png'],
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
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="loading font-sans antialiased">
        <StructuredData />
        <Preloader />
        <div className="grain" aria-hidden="true" />
        <ScrollProgress />
        <SpotlightEffect />
        <Header />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
