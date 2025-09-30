'use client';

import FeedbackForm from '@/components/FeedbackForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FeedbackPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            {t('feedbackPage.title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('feedbackPage.description')}
          </p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
