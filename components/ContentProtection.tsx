'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ContentProtection() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // 1. コピー・カット防止
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // input や textarea の内部は許可
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      e.preventDefault();
      triggerWarning();
    };

    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      e.preventDefault();
      triggerWarning();
    };

    // 2. 右クリック (コンテキストメニュー) 禁止
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      e.preventDefault();
      triggerWarning();
    };

    // 3. キーボードショートカット防止 (Ctrl+C, Cmd+C, Ctrl+A, Cmd+A, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCtrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (isCtrlOrCmd) {
        const key = e.key.toLowerCase();
        // c: コピー, a: 全選択, u: ソース表示, s: ページ保存, p: 印刷
        if (key === 'c' || key === 'a' || key === 'u' || key === 's' || key === 'p') {
          e.preventDefault();
          triggerWarning();
        }
      }
    };

    // 4. ドラッグ開始防止 (画像やテキストのドラッグアウト防止)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };

    let timeoutId: NodeJS.Timeout;
    const triggerWarning = () => {
      setShowWarning(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowWarning(false);
      }, 2500);
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 text-white text-xs font-bold rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>掲載コンテンツ・財務データの無断転載・コピーは保護されています</span>
      </div>
    </div>
  );
}
