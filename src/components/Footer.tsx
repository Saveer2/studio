'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border/40 bg-secondary/50 mt-16">
      <div className="container mx-auto text-center text-muted-foreground">
        <p className="font-bold text-foreground font-headline text-lg">{t('footer.title')}</p>
        <p className="mt-2">{t('footer.copyright', { year: currentYear })}</p>
        <p className="text-sm mt-2">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
