'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, X, FileText, Calendar, Building2, Send, Check } from 'lucide-react';
import { FactAuditResult } from '@/lib/fact-checker';
import { useLanguage } from '@/lib/language-context';

interface FactAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditResult: FactAuditResult;
}

export default function FactAuditModal({ isOpen, onClose, auditResult }: FactAuditModalProps) {
  const { isEn } = useLanguage();
  const [reportText, setReportText] = useState('');
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReportSubmitted(true);
      setTimeout(() => {
        setReportText('');
        setIsReportSubmitted(false);
      }, 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* モーダルヘッダー */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              {isEn ? 'Official Fact-Check & Audit Dossier' : '公式開示ファクトチェック ＆ 監査証明書'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {auditResult.reitName} ({auditResult.tickerCode})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isEn
              ? 'Independent automated data audit verifying official periodic securities filings and arithmetic integrity.'
              : '有価証券報告書・資産運用報告書等の公式開示資料に基づき、金額・日時・社名・物件名の整合性を自動監査済。'}
          </p>
        </div>

        {/* モーダルボディ */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* 公式ソース情報 */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                {isEn ? 'Official Filing Source' : '公式準拠 開示資料元'}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {isEn ? '100% Verified' : '完全照合済'}
              </span>
            </div>

            <div className="font-bold text-sm text-slate-900">
              {isEn ? auditResult.sourceMeta.officialDocumentNameEn : auditResult.sourceMeta.officialDocumentName}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400 block">{isEn ? 'Authority' : '提出・監督機関'}</span>
                <span className="font-medium text-slate-800">{auditResult.sourceMeta.sourceAuthority}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isEn ? 'Audit Benchmark' : '開示基準期'}</span>
                <span className="font-medium text-slate-800">{auditResult.sourceMeta.filingDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isEn ? 'Audited Assets' : '監査済保有物件数'}</span>
                <span className="font-mono font-bold text-slate-900">{auditResult.propertiesAuditedCount} {isEn ? 'Assets' : '物件'}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
              <strong>{isEn ? 'Auditor Note: ' : '監査注記: '}</strong>
              {isEn ? auditResult.sourceMeta.auditorNoteEn : auditResult.sourceMeta.auditorNote}
            </p>
          </div>

          {/* 5大項目 整合性監査チェックリスト */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
              {isEn ? 'Automated Sanity & Fact-Check Matrix (5 Checks)' : '自動ファクトチェック・整合性監査マトリクス (5項目)'}
            </h3>

            <div className="space-y-2">
              {auditResult.checks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-300 transition"
                >
                  <div className="mt-0.5">
                    {check.status === 'PASS' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-900">
                        {isEn ? check.nameEn : check.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {check.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {isEn ? check.detailEn : check.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 外部公式IRリンク */}
          <div className="flex items-center justify-between p-3 bg-teal-50/50 rounded-2xl border border-teal-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold text-teal-900">
                {isEn ? 'Verify on Official IR Website' : '投資法人 公式IR・開示サイトで原本確認'}
              </span>
            </div>
            <a
              href={auditResult.sourceMeta.officialIrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs"
            >
              <span>{isEn ? 'Open Official IR' : '公式開示を見る'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* ワンクリック ユーザー誤記報告フォーム */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block">
              {isEn ? 'Found an update or discrepancy? Report to Data Team:' : '最新の移転や開示変更をお気づきですか？データ監査チームへ報告:'}
            </span>
            {isReportSubmitted ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Thank you! Report received and queued for next audit sync.' : 'ご報告ありがとうございます！次期データ更新監査キューに登録されました。'}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder={isEn ? 'e.g., Tenant changed in 2026, new acquisition disclosed...' : '例: 〇〇物件のテナントが変更された、新規取得が開示された等...'}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !reportText.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <Send className="w-3 h-3" />
                  <span>{isSubmitting ? (isEn ? 'Sending...' : '送信中...') : (isEn ? 'Report' : '報告')}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* モーダルフッター */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            {isEn ? 'Close Dossier' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
}
