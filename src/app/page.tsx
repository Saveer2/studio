import PlatformCard from '@/components/PlatformCard';
import RecommendationForm from '@/components/RecommendationForm';
import { BusIcon } from '@/components/icons/BusIcon';
import { MetroIcon } from '@/components/icons/MetroIcon';
import { RailwayIcon } from '@/components/icons/RailwayIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const platforms = [
    {
      title: 'Bus',
      description: 'Find out how to book bus tickets for your city or inter-city travel.',
      href: '/bus',
      icon: <BusIcon className="w-16 h-16" />,
    },
    {
      title: 'Metro',
      description: 'Navigate the metro system with ease by booking your tickets online.',
      href: '/metro',
      icon: <MetroIcon className="w-16 h-16" />,
    },
    {
      title: 'Railway',
      description: 'Your guide to booking train tickets for short and long distance journeys.',
      href: '/railway',
      icon: <RailwayIcon className="w-16 h-16" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center mb-24">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-down">
          Online Ticketing, Simplified.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Never get stuck in a queue again. TicketBuddy provides you with easy-to-follow guides for booking your transport tickets online. Choose your ride and get started!
        </p>
      </section>

      <section className="mb-24">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          Choose Your Ride
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <PlatformCard key={platform.title} {...platform} />
          ))}
        </div>
      </section>
      
      <section>
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10">
          <CardHeader className="text-center">
            <h2 className="font-headline text-4xl font-bold">
              Get an AI-Powered Recommendation
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
