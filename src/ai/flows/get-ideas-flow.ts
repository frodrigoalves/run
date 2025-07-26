'use server';
/**
 * @fileOverview A flow to retrieve all idea submissions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getIdeas } from '@/services/idea-service';

const IdeaSchema = z.object({
    id: z.string(),
    text: z.string(),
    timestamp: z.date(),
})

const GetIdeasOutputSchema = z.array(IdeaSchema);

export async function getIdeasFlow(): Promise<z.infer<typeof GetIdeasOutputSchema>> {
  return retrieveIdeasFlow();
}

const retrieveIdeasFlow = ai.defineFlow(
  {
    name: 'retrieveIdeasFlow',
    outputSchema: GetIdeasOutputSchema,
  },
  async () => {
    return getIdeas();
  }
);
