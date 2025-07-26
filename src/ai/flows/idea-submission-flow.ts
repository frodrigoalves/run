'use server';
/**
 * @fileOverview A flow to handle anonymous idea submissions.
 *
 * - submitIdea - A function that handles the idea submission process.
 * - IdeaSubmissionInput - The input type for the submitIdea function.
 * - IdeaSubmissionOutput - The return type for the submitIdea function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { addIdea } from '@/services/idea-service';

const IdeaSubmissionInputSchema = z.object({
  idea: z.string().describe("The user's project idea or query."),
  isPublic: z.boolean().describe('Whether the user authorizes the idea to be displayed publicly.'),
  contact: z.string().optional().describe('The user\'s optional contact information.'),
});
export type IdeaSubmissionInput = z.infer<typeof IdeaSubmissionInputSchema>;

const IdeaSubmissionOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type IdeaSubmissionOutput = z.infer<typeof IdeaSubmissionOutputSchema>;

export async function submitIdea(input: IdeaSubmissionInput): Promise<IdeaSubmissionOutput> {
  return ideaSubmissionFlow(input);
}

const ideaSubmissionFlow = ai.defineFlow(
  {
    name: 'ideaSubmissionFlow',
    inputSchema: IdeaSubmissionInputSchema,
    outputSchema: IdeaSubmissionOutputSchema,
  },
  async (input) => {
    
    addIdea(input.idea, input.isPublic, input.contact);
    
    return {
      success: true,
      message: 'Idea submitted successfully.',
    };
  }
);
