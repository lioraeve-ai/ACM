'use server';

/**
 * @fileOverview Extracts initials from a given URL using Puppeteer.
 *
 * - getInitialsFromURL - A function that extracts the initials from a URL.
 * - InitialsFromURLInput - The input type for the getInitialsFromURL function.
 * - InitialsFromURLOutput - The return type for the getInitialsFromURL function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import puppeteer from 'puppeteer'

const InitialsFromURLInputSchema = z.object({
  url: z.string().describe('The URL to extract the initials from.'),
});
export type InitialsFromURLInput = z.infer<typeof InitialsFromURLInputSchema>;

const InitialsFromURLOutputSchema = z.object({
  initials: z.string().describe('The extracted initials from the URL.'),
});
export type InitialsFromURLOutput = z.infer<typeof InitialsFromURLOutputSchema>;

export async function getInitialsFromURL(input: InitialsFromURLInput): Promise<InitialsFromURLOutput> {
  return initialsFromURLFlow(input);
}

const extractInitialsTool = ai.defineTool({
    name: 'extractInitials',
    description: 'Extracts the initials from a given URL using Puppeteer.',
    inputSchema: z.object({
      url: z.string().describe('The URL to extract the initials from.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      const browser = await puppeteer.launch({headless: "new"});
      const page = await browser.newPage();
      await page.goto(input.url);
      const bodyText = await page.evaluate(() => document.body.innerText);
      await browser.close();

      const words = bodyText.split(/\s+/);
      const initials = words
        .map(word => word.charAt(0).toUpperCase())
        .join('');

      return initials;
    } catch (error: any) {
      console.error('Error extracting initials:', error);
      return `Error: Could not extract initials from ${input.url}. ${error.message}`;
    }
  }
);

const initialsFromURLPrompt = ai.definePrompt({
  name: 'initialsFromURLPrompt',
  tools: [extractInitialsTool],
  input: {schema: InitialsFromURLInputSchema},
  output: {schema: InitialsFromURLOutputSchema},
  prompt: `Extract the initials from the content of the following URL using the extractInitials tool: {{url}}.`,
});

const initialsFromURLFlow = ai.defineFlow(
  {
    name: 'initialsFromURLFlow',
    inputSchema: InitialsFromURLInputSchema,
    outputSchema: InitialsFromURLOutputSchema,
  },
  async input => {
    const {output} = await initialsFromURLPrompt(input);
    return output!;
  }
);
