/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { aiFactory } from './aiFactory';
import { cache } from './cache';
import { PRODUCTS } from '../constants';

export interface AIAdapter {
  sendMessage(history: {role: string, text: string}[], newMessage: string, mode: 'fast' | 'complex'): Promise<string>;
  generateImage(prompt: string): Promise<string | null>;
}

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are the AI Concierge for "Achadinhos Maternidade", a warm, organic lifestyle tech brand. 
  Your tone is calm, inviting, grounded, and sophisticated. Avoid overly "techy" jargon; prefer words like "natural", "seamless", "warm", and "texture".
  
  Here is our current product catalog:
  ${productContext}
  
  Answer customer questions about specifications, recommendations, and brand philosophy.
  Keep answers concise (under 3 sentences usually) to fit the chat UI. 
  If asked about products not in the list, gently steer them back to Achadinhos Maternidade products.`;
};

export const GeminiAdapter: AIAdapter = {
  sendMessage: async (history, newMessage, mode) => {
    const cacheKey = `chat_${JSON.stringify(history)}_${newMessage}`;
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) return cachedResponse;

    try {
      const ai = aiFactory.getInstance();
      const model = mode === 'fast' ? 'gemini-3.1-flash-lite-preview' : 'gemini-3.1-pro-preview';
      
      const chat = ai.chats.create({
        model,
        config: { systemInstruction: getSystemInstruction() },
        history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
      });

      const result = await chat.sendMessage({ message: newMessage });
      const responseText = result.text || "";
      
      cache.set(cacheKey, responseText);
      return responseText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
    }
  },

  generateImage: async (prompt) => {
    const cacheKey = `image_${prompt}`;
    const cachedImage = cache.get(cacheKey);
    if (cachedImage) return cachedImage;

    try {
      const ai = aiFactory.getInstance();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
      });
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          cache.set(cacheKey, imageUrl);
          return imageUrl;
        }
      }
      return null;
    } catch (error) {
      console.error("Image Generation Error:", error);
      return null;
    }
  }
};
