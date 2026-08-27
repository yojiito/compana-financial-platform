import React from 'react';
import { Metadata } from 'next';
import SectorAnalysisHub from '@/components/SectorAnalysisHub';

export const metadata: Metadata = {
  title: '業界・セクター分析ハブ | compana (カンパーナ)',
  description: '主要産業別の市場規模・企業別シェア・売上高・営業利益率・時価総額・組織規模をマルチ指標で分析するcompana業界ハブ。',
};

export default function SectorsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      <SectorAnalysisHub />
    </main>
  );
}