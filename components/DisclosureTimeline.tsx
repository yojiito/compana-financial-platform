'use client';

import React from 'react';
import { FileText, ExternalLink, Download, FileCheck, Clock, Calendar } from 'lucide-react';

interface DisclosureItem {
  docId?: string | null;
  discloseAt: string;
  docType: string;
  title: string;
  url?: string | null;
}

interface DisclosureTimelineProps {
  disclosures: DisclosureItem[];
  tickerCode: string;
}

export default function DisclosureTimeline({ disclosures, tickerCode }: DisclosureTimelineProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            開示書類・適時開示タイムライン (EDINET / TDnet)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            有価証券報告書・四半期報告書・決算短信・適時開示資料の公式原本一覧
          </p>
        </div>
        <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
          証券コード: {tickerCode}
        </span>
      </div>

      {disclosures.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          直近の開示書類はありません
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {disclosures.map((doc, idx) => {
            const isAnnual = doc.docType.includes('有価証券報告書');
            const isEarnings = doc.docType.includes('決算短信');

            return (
              <div
                key={idx}
                className="py-4 hover:bg-slate-50/80 px-3 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {doc.discloseAt}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isAnnual
                          ? 'bg-emerald-100 text-emerald-800'
                          : isEarnings
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {doc.docType}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition">
                    {doc.title}
                  </h4>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={doc.url || `https://disclosure2.edinet-fsa.go.jp/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 transition"
                  >
                    <span>公式開示を開く</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}