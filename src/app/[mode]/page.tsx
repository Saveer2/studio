'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

type GuidePageProps = {
  params: {
    mode: string;
  };
};

export default function GuidePage({ params }: GuidePageProps) {
  const { mode } = params;
  const { t } = useLanguage();

  const guideData: { [key: string]: { title: string; intro: string; steps: { title: string; description: string }[] } } = {
    bus: {
      title: t('guide.busTitle'),
      intro: t('guide.busIntro'),
      steps: [
        { title: t('guide.busStep1Title'), description: t('guide.busStep1Description') },
        { title: t('guide.busStep2Title'), description: t('guide.busStep2Description') },
        { title: t('guide.busStep3Title'), description: t('guide.busStep3Description') },
        { title: t('guide.busStep4Title'), description: t('guide.busStep4Description') },
        { title: t('guide.busStep5Title'), description: t('guide.busStep5Description') },
      ],
    },
    metro: {
      title: t('guide.metroTitle'),
      intro: t('guide.metroIntro'),
      steps: [
        { title: t('guide.metroStep1Title'), description: t('guide.metroStep1Description') },
        { title: t('guide.metroStep2Title'), description: t('guide.metroStep2Description') },
        { title: t('guide.metroStep3Title'), description: t('guide.metroStep3Description') },
        { title: t('guide.metroStep4Title'), description: t('guide.metroStep4Description') },
        { title: t('guide.metroStep5Title'), description: t('guide.metroStep5Description') },
      ],
    },
    railway: {
      title: t('guide.railwayTitle'),
      intro: t('guide.railwayIntro'),
      steps: [
        { title: t('guide.railwayStep1Title'), description: t('guide.railwayStep1Description') },
        { title: t('guide.railwayStep2Title'), description: t('guide.railwayStep2Description') },
        { title: t('guide.railwayStep3Title'), description: t('guide.railwayStep3Description') },
        { title: t('guide.railwayStep4Title'), description: t('guide.railwayStep4Description') },
        { title: t('guide.railwayStep5Title'), description: t('guide.railwayStep5Description') },
      ],
    },
  };

  const guide = guideData[mode];

  if (!guide) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="ghost" className="group transition-all duration-300">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t('guide.backToHome')}
          </Link>
        </Button>
      </div>
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">{guide.title}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{guide.intro}</p>
      </div>

      <Separator className="my-12" />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {guide.steps.map((step, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 overflow-hidden group/step">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 bg-secondary/50 flex items-center justify-center md:w-28">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl font-headline transition-transform duration-300 group-hover/step:scale-110 group-hover/step:rotate-6">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys({bus: {}, metro: {}, railway: {}}).map((mode) => ({
    mode,
  }));
}
