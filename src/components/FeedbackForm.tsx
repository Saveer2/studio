'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleFeedback } from '@/app/actions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const initialState = {
  message: undefined,
  error: undefined,
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold text-lg py-6 transition-all duration-300 transform hover:scale-105 hover:bg-accent hover:text-accent-foreground active:scale-100">
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6" />}
      {t('feedbackPage.form.submitButton')}
    </Button>
  );
}

export default function FeedbackForm() {
  const [state, formAction] = useFormState(handleFeedback, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (state?.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state?.message) {
      toast({
        title: 'Success!',
        description: state.message,
        className: 'bg-primary/90 text-primary-foreground'
      });
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg mt-12 border-2">
      <form ref={formRef} action={formAction}>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('feedbackPage.form.nameLabel')}</Label>
              <Input id="name" name="name" placeholder={t('feedbackPage.form.namePlaceholder')} required aria-describedby="name-error" />
              {state?.errors?.name && <p id="name-error" className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('feedbackPage.form.emailLabel')}</Label>
              <Input id="email" name="email" type="email" placeholder={t('feedbackPage.form.emailPlaceholder')} required aria-describedby="email-error" />
              {state?.errors?.email && <p id="email-error" className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">{t('feedbackPage.form.feedbackLabel')}</Label>
            <Textarea id="feedback" name="feedback" placeholder={t('feedbackPage.form.feedbackPlaceholder')} rows={5} required aria-describedby="feedback-error"/>
            {state?.errors?.feedback && <p id="feedback-error" className="text-sm text-destructive">{state.errors.feedback[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
