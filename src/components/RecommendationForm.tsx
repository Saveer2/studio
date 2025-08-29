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

const initialState = {
  data: undefined,
  error: undefined,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold text-lg py-6 transition-all duration-300 transform hover:scale-105 hover:bg-accent hover:text-accent-foreground active:scale-100">
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Lightbulb className="mr-2 h-6 w-6" />}
      Get Recommendation
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(handleRecommendation, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

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
            Just tell us where you are and when you're going. Our AI will suggest the best ticketing platform for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="font-semibold">Your Current Location</Label>
              <Input id="location" name="location" placeholder="e.g., Downtown, Central Station" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="travelTime" className="font-semibold">Intended Travel Time</Label>
                <Select name="travelTime" defaultValue="morning">
                  <SelectTrigger id="travelTime">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportationMode" className="font-semibold">Mode of Transport</Label>
                <Select name="transportationMode" defaultValue="Bus">
                  <SelectTrigger id="transportationMode">
                    <SelectValue placeholder="Select a mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Metro">Metro</SelectItem>
                    <SelectItem value="Railway">Railway</SelectItem>
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
                <AlertTitle className="font-headline text-primary">Recommendation Result</AlertTitle>
                <AlertDescription className="space-y-2 mt-2">
                  <p className="font-bold text-lg">Platform: <span className="text-primary">{state.data.platformName}</span></p>
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
