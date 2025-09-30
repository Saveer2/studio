'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import en from '@/translations/en.json';
import hi from '@/translations/hi.json';
import mr from '@/translations/mr.json';

const translations: { [key: string]: any } = {
  en,
  hi,
  mr,
};

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let text = translations[language];
    for (const k of keys) {
      if (text && typeof text === 'object' && k in text) {
        text = text[k];
      } else {
        return key;
      }
    }
    
    if (typeof text === 'string' && options) {
      Object.keys(options).forEach(k => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(options[k]));
      });
    }

    return typeof text === 'string' ? text : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
