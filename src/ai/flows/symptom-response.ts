'use server';

/**
 * @fileOverview A symptom response AI agent.
 *
 * - symptomResponse - A function that handles the symptom response process.
 * - SymptomResponseInput - The input type for the symptomResponse function.
 * - SymptomResponseOutput - The return type for the symptomResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomResponseInputSchema = z.object({
  symptoms: z.string().describe('The symptoms of the user.'),
});
export type SymptomResponseInput = z.infer<typeof SymptomResponseInputSchema>;

const SymptomResponseOutputSchema = z.object({
  response: z.string().describe('The response to the user based on the symptoms.'),
});
export type SymptomResponseOutput = z.infer<typeof SymptomResponseOutputSchema>;

export async function symptomResponse(input: SymptomResponseInput): Promise<SymptomResponseOutput> {
  return symptomResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomResponsePrompt',
  input: {schema: SymptomResponseInputSchema},
  output: {schema: SymptomResponseOutputSchema},
  prompt: `You are a helpful AI assistant that provides information based on symptoms.

  Symptoms: {{{symptoms}}}
  `,
});

const symptomResponseFlow = ai.defineFlow(
  {
    name: 'symptomResponseFlow',
    inputSchema: SymptomResponseInputSchema,
    outputSchema: SymptomResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
