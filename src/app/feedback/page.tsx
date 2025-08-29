import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Share Your Thoughts
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We value your feedback. Let us know how we can improve TicketBuddy. Your insights help us make travel simpler for everyone.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
