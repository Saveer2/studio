import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type GuidePageProps = {
  params: {
    mode: string;
  };
};

const guideData: { [key: string]: { title: string; intro: string; steps: { title: string; description: string }[] } } = {
  bus: {
    title: 'How to Book a Bus Ticket',
    intro: 'Booking bus tickets online is a breeze. Follow these simple steps to secure your seat for your next journey, whether it\'s across town or across the country.',
    steps: [
      { title: 'Choose Your Operator', description: 'Open the recommended app and select your city\'s bus operator or the inter-city bus service you want to use.' },
      { title: 'Enter Journey Details', description: 'Input your starting point, destination, and date of travel. Select the number of passengers.' },
      { title: 'Select Your Bus & Seat', description: 'Browse through the available buses. Look at timings, ratings, and amenities. Choose your preferred seat.' },
      { title: 'Make Payment', description: 'Proceed to the payment gateway. You can use credit/debit cards, net banking, or digital wallets.' },
      { title: 'Get Your e-Ticket', description: 'Once payment is successful, your e-ticket will be generated. You can find it in the "My Bookings" section and in your email.' },
    ],
  },
  metro: {
    title: 'How to Book a Metro Ticket',
    intro: 'Skip the long queues at the station. Buying your metro ticket online is fast, efficient, and gets you on your way quicker. Here\'s how.',
    steps: [
      { title: 'Download the Official App', description: 'Go to the app store and download the official metro app for your city.' },
      { title: 'Plan Your Journey', description: 'Enter your starting and destination stations. The app will show you the route, fare, and travel time.' },
      { title: 'Choose Ticket Type', description: 'Select between a single journey ticket, a return ticket, or a smart card recharge.' },
      { title: 'Pay Securely', description: 'Use your preferred payment method to complete the transaction.' },
      { title: 'Use the QR Code', description: 'A QR code ticket will be generated. Scan it at the entry and exit gates of the metro stations.' },
    ],
  },
  railway: {
    title: 'How to Book a Railway Ticket',
    intro: 'Booking train tickets online has never been easier. Follow this guide to navigate the official platforms and book your journey with confidence.',
    steps: [
      { title: 'Login to the Platform', description: 'Visit the official railway website or app and log in with your credentials. If you are a new user, register first.' },
      { title: 'Find Your Train', description: 'Enter your source and destination stations, travel date, and preferred class (e.g., Sleeper, AC).' },
      { title: 'Check Availability & Book', description: 'Check seat availability for different trains. Once you find a suitable option, proceed to fill in passenger details.' },
      { title: 'Complete Payment', description: 'Review your booking and make the payment through the various options available.' },
      { title: 'Confirmation', description: 'After a successful payment, you will receive a confirmation PNR number via SMS and email. Your ticket details can be viewed online.' },
    ],
  },
};

export default function GuidePage({ params }: GuidePageProps) {
  const { mode } = params;
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
            Back to Home
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
  return Object.keys(guideData).map((mode) => ({
    mode,
  }));
}
