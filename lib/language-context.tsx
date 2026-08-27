'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ja',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  isEn: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    // 1. ローカルストレージに過去の選択があれば最優先
    const savedLang = localStorage.getItem('compana_lang') as Language | null;
    if (savedLang === 'ja' || savedLang === 'en') {
      setLanguageState(savedLang);
      return;
    }

    // 2. なければブラウザの言語設定を自動判定 (スマート・ハイブリッド)
    if (typeof window !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ja')) {
        setLanguageState('ja');
      } else {
        // 英語および海外ブラウザは自動で英語モード
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('compana_lang', lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'ja' ? 'en' : 'ja';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    // フォールバック
    if (TRANSLATIONS.ja && TRANSLATIONS.ja[key]) {
      return TRANSLATIONS.ja[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isEn: language === 'en',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}