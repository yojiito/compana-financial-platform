import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentProtection from '@/components/ContentProtection';
import { LanguageProvider } from '@/lib/language-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'compana（カンパーナ） - 企業分析プラットフォーム | 上場IR & 未上場官報決算公告',
  description: 'Company（企業）× Analysis（分析）から生まれた企業分析プラットフォーム「compana（カンパーナ）」。上場企業の10年財務3表（PL/BS/CF）・TradingView株価チャートから、未上場スタートアップの官報決算公告・Cap Table（大株主名簿）・資本政策までワンストップで分析。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
        <LanguageProvider>
          <ContentProtection />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}