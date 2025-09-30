'use server';

import { z } from 'zod';
import { recommendTicketPlatform } from '@/ai/flows/recommend-ticket-platform';
import type { RecommendTicketPlatformOutput } from '@/ai/flows/recommend-ticket-platform';
import nodemailer from 'nodemailer';

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
  
  const { name, email, feedback } = validatedFields.data;

  // Log feedback to console
  console.log('New Feedback Received:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Feedback:', feedback);

  // Send email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'moresaveer4@gmail.com',
      subject: 'New Feedback from TicketBuddy',
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Feedback email sent successfully.');
  } catch (error) {
    console.error('Error sending feedback email:', error);
    // You might want to return an error state here to the user
    // For now, we just log it and return the success message for the form submission itself.
  }

  return { message: 'Thank you for your feedback! We have received your message.' };
}
