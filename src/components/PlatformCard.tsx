import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface PlatformCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const PlatformCard = ({ title, description, href, icon }: PlatformCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 border-2 border-transparent hover:border-primary/80 flex flex-col">
        <CardHeader className="items-center text-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground mb-4">
            {icon}
          </div>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex-grow flex flex-col justify-between">
          <CardDescription>{description}</CardDescription>
          <div className="mt-6 flex justify-center items-center text-primary font-bold">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlatformCard;
