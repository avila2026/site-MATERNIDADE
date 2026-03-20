/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { cache } from './cache';
import { PRODUCTS } from '../constants';
import type { AIAdapter } from './aiAdapter';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

const SYSTEM_INSTRUCTION: string = (() => {
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
})();

/**
 * Compute a lightweight hash string for a chat history + new message.
 * Uses a djb2-style algorithm.
 */
const hashChatKey = (history: {role: string, text: string}[], newMessage: string): string => {
  let hash = 5381;
  const str = history.map(h => `${h.role}:${h.text}`).join('|') + '|' + newMessage;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return `ollama_chat_${history.length}_${hash}`;
};

/**
 * Map the internal role names to Ollama-compatible roles.
 * Ollama expects "system", "user", "assistant".
 */
const mapRole = (role: string): string => {
  if (role === 'model') return 'assistant';
  return role;
};

export const OllamaAdapter: AIAdapter = {
  sendMessage: async (history, newMessage, _mode) => {
    const cacheKey = hashChatKey(history, newMessage);
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) return cachedResponse;

    try {
      const messages = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...history.map(h => ({ role: mapRole(h.role), content: h.text })),
        { role: 'user', content: newMessage },
      ];

      const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const responseText = data.message?.content || '';

      cache.set(cacheKey, responseText);
      return responseText;
    } catch (error) {
      console.error('Ollama API Error:', error);
      return 'Desculpe, estou com dificuldades para me conectar ao serviço de IA no momento.';
    }
  },

  generateImage: async (_prompt) => {
    // Ollama does not natively support image generation.
    console.warn('Image generation is not supported by the Ollama provider.');
    return null;
  },
};
