'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { handleRecommendation } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';


const initialState = {
  data: undefined,
  error: undefined,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold text-lg py-6 transition-all duration-300 transform hover:scale-105 hover:bg-accent hover:text-accent-foreground active:scale-100">
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Lightbulb className="mr-2 h-6 w-6" />}
      {t('home.getRecommendationButton')}
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(handleRecommendation, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state.data) {
      formRef.current?.reset();
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, toast]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardDescription className="text-center">
            {t('home.aiRecommendationDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="font-semibold">{t('home.currentLocationLabel')}</Label>
              <Input id="location" name="location" placeholder={t('home.currentLocationPlaceholder')} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="travelTime" className="font-semibold">{t('home.travelTimeLabel')}</Label>
                <Select name="travelTime" defaultValue="morning">
                  <SelectTrigger id="travelTime">
                    <SelectValue placeholder={t('home.travelTimePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">{t('home.morning')}</SelectItem>
                    <SelectItem value="afternoon">{t('home.afternoon')}</SelectItem>
                    <SelectItem value="evening">{t('home.evening')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportationMode" className="font-semibold">{t('home.transportModeLabel')}</Label>
                <Select name="transportationMode" defaultValue="Bus">
                  <SelectTrigger id="transportationMode">
                    <SelectValue placeholder={t('home.transportModePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bus">{t('home.bus')}</SelectItem>
                    <SelectItem value="Metro">{t('home.metro')}</SelectItem>
                    <SelectItem value="Railway">{t('home.railway')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SubmitButton />
          </form>

          {state.data && (
            <div className="mt-8 animate-fade-in-down" ref={resultRef} key={state.timestamp}>
              <Alert className="bg-primary/10 border-primary/50 text-foreground">
                <Terminal className="h-4 w-4 text-primary" />
                <AlertTitle className="font-headline text-primary">{t('home.recommendationResultTitle')}</AlertTitle>
                <AlertDescription className="space-y-2 mt-2">
                  <p className="font-bold text-lg">{t('home.platformLabel')}: <span className="text-primary">{state.data.platformName}</span></p>
                  <p>{state.data.reason}</p>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
