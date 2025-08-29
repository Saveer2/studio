import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border/40 bg-secondary/50 mt-16">
      <div className="container mx-auto text-center text-muted-foreground">
        <p className="font-bold text-foreground font-headline text-lg">TicketBuddy</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} TicketBuddy. All rights reserved.</p>
        <p className="text-sm mt-2">
          Made with ❤️ to simplify your travel.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
