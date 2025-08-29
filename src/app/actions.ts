'use server';

import { z } from 'zod';
import { recommendTicketPlatform } from '@/ai/flows/recommend-ticket-platform';
import type { RecommendTicketPlatformOutput } from '@/ai/flows/recommend-ticket-platform';

const recommendationSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  travelTime: z.enum(['morning', 'afternoon', 'evening']),
  transportationMode: z.enum(['Bus', 'Metro', 'Railway']),
});

interface RecommendationState {
  data?: RecommendTicketPlatformOutput;
  error?: string;
  timestamp?: number;
}

export async function handleRecommendation(
  prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse({
    location: formData.get('location'),
    travelTime: formData.get('travelTime'),
    transportationMode: formData.get('transportationMode'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const result = await recommendTicketPlatform(validatedFields.data);
    return { data: result, timestamp: Date.now() };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters long'),
});

interface FeedbackState {
  message?: string;
  error?: string;
  errors?: { [key: string]: string[] | undefined };
}

export async function handleFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const validatedFields = feedbackSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    feedback: formData.get('feedback'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  console.log('New Feedback Received:');
  console.log('Name:', validatedFields.data.name);
  console.log('Email:', validatedFields.data.email);
  console.log('Feedback:', validatedFields.data.feedback);

  return { message: 'Thank you for your feedback! We have received your message.' };
}
