'use server';

/**
 * @fileOverview An AI agent that recommends the best online ticketing platform based on location and travel time.
 *
 * - recommendTicketPlatform - A function that handles the platform recommendation process.
 * - RecommendTicketPlatformInput - The input type for the recommendTicketPlatform function.
 * - RecommendTicketPlatformOutput - The return type for the recommendTicketPlatform function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTicketPlatformInputSchema = z.object({
  location: z.string().describe('The user\u2019s current location.'),
  travelTime: z.string().describe('The user\u2019s intended travel time (e.g., \"morning\", \"afternoon\", \"evening\").'),
  transportationMode: z.enum(['Bus', 'Metro', 'Railway']).describe('The mode of transportation the user is interested in.'),
});
export type RecommendTicketPlatformInput = z.infer<typeof RecommendTicketPlatformInputSchema>;

const RecommendTicketPlatformOutputSchema = z.object({
  platformName: z.string().describe('The name of the recommended ticketing platform.'),
  reason: z.string().describe('The reason for recommending this platform.'),
});
export type RecommendTicketPlatformOutput = z.infer<typeof RecommendTicketPlatformOutputSchema>;

export async function recommendTicketPlatform(input: RecommendTicketPlatformInput): Promise<RecommendTicketPlatformOutput> {
  return recommendTicketPlatformFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTicketPlatformPrompt',
  input: {schema: RecommendTicketPlatformInputSchema},
  output: {schema: RecommendTicketPlatformOutputSchema},
  prompt: `You are an expert in recommending online ticketing platforms for various modes of transportation.

  Based on the user's location, intended travel time, and mode of transportation, recommend the best official online ticketing platform.

  Location: {{{location}}}
  Travel Time: {{{travelTime}}}
  Transportation Mode: {{{transportationMode}}}

  Consider factors such as convenience, reliability, user reviews, and any specific advantages of each platform for the given context.
  Explain the reason for your recommendation.
  Ensure that the platform is official and reliable.
  `,
});

const recommendTicketPlatformFlow = ai.defineFlow(
  {
    name: 'recommendTicketPlatformFlow',
    inputSchema: RecommendTicketPlatformInputSchema,
    outputSchema: RecommendTicketPlatformOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
