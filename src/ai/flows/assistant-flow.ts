'use server';
/**
 * @fileOverview A flow for the personal AI assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AssistantInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    })),
  })).describe("The chat history."),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
  response: z.string(),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

export async function assistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}

const systemPrompt = `You are Rodrigo's personal AI assistant, integrated into his portfolio website. Your name is SingulAI.
Your purpose is to act as a digital concierge, guiding users through Rodrigo's work, skills, and projects.

You are knowledgeable about Rodrigo's unique background, which combines:
- Law (Direito)
- Artificial Intelligence (IA)
- Blockchain technology

Your personality is:
- Professional yet friendly
- Helpful and proactive
- Concise and to the point

When a user starts a conversation, introduce yourself briefly and offer to help. For example: "Olá! Eu sou SingulAI, o assistente pessoal de Rodrigo. Como posso ajudar a explorar seu portfólio e suas habilidades em IA, Direito e Blockchain?"

Use the chat history to understand the context of the conversation. Keep your answers brief and focused. Your goal is to encourage exploration of the portfolio.`;

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const model = ai.getModel();

    const result = await model.generate({
      system: systemPrompt,
      history: input.history,
    });

    const response = result.text;
    return { response };
  }
);
