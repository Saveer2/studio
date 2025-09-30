import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
            <Ticket className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-foreground">
            TicketBuddy
          </h1>
        </Link>
        <nav>
          <Button asChild className="font-bold transition-all duration-300 transform hover:scale-110 hover:skew-x-[-6deg] hover:bg-accent hover:text-accent-foreground shadow-md hover:shadow-lg hover:shadow-accent/50">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfgwvsazsTKhPRWJqMBT6sThb43og4-wyP54I5hDlzF-84Qpg/viewform?usp=header" target="_blank" rel="noopener noreferrer">Feedback</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
