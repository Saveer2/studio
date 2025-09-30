'use client';

import PlatformCard from '@/components/PlatformCard';
import RecommendationForm from '@/components/RecommendationForm';
import { BusIcon } from '@/components/icons/BusIcon';
import { MetroIcon } from '@/components/icons/MetroIcon';
import { RailwayIcon } from '@/components/icons/RailwayIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Home() {
  const { t } = useLanguage();
  const platforms = [
    {
      title: t('home.busTitle'),
      description: t('home.busDescription'),
      href: '/bus',
      icon: <BusIcon className="w-16 h-16" />,
    },
    {
      title: t('home.metroTitle'),
      description: t('home.metroDescription'),
      href: '/metro',
      icon: <MetroIcon className="w-16 h-16" />,
    },
    {
      title: t('home.railwayTitle'),
      description: t('home.railwayDescription'),
      href: '/railway',
      icon: <RailwayIcon className="w-16 h-16" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center mb-24">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-down">
          {t('home.headline')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('home.subheadline')}
        </p>
      </section>

      <section className="mb-24">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          {t('home.chooseRide')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <PlatformCard key={platform.title} {...platform} getStartedText={t('home.getStarted')} />
          ))}
        </div>
      </section>
      
      <section>
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10">
          <CardHeader className="text-center">
            <h2 className="font-headline text-4xl font-bold">
              {t('home.aiRecommendationTitle')}
            </h2>
          </CardHeader>
          <CardContent>
            <RecommendationForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
