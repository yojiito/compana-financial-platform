import type { Metadata } from 'next';
import MaDealsHub from '@/components/MaDealsHub';

export const metadata: Metadata = {
  title: 'M&A・買収 ＆ 資本提携データベース | compana（カンパーナ）',
  description: '金融庁EDINET臨時報告書・東証TDnet適時開示に基づく日本企業の大型M&A・クロスボーダー海外買収・敵対的TOB・スタートアップ買収事例データベース。買収額・プレミアム・のれん・アドバイザー・買収後PMI成果を一挙網羅。',
};

export default function MaDealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <MaDealsHub />
    </div>
  );
}