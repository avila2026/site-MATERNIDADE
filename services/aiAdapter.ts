/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Ponto de entrada unificado para os adaptadores de IA.
 *
 * Uso:
 *   import { GeminiAdapter }    from './aiAdapter';  // Gemini direto
 *   import { AnthropicAdapter } from './aiAdapter';  // Claude direto
 *   import { getAdapter }       from './aiAdapter';  // Seleção dinâmica
 */

import { AIAdapter, AIProvider } from '../types';
import { aiFactory } from './aiFactory';
import { anthropicFactory } from './anthropicFactory';
import { cache } from './cache';
import { PRODUCTS } from '../constants';

// ─────────────────────────────────────────────────────────────
// System instruction compartilhada (mantida em um único lugar)
// ─────────────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION: string = (() => {
  const productContext = PRODUCTS.map(p =>
    `- ${p.name} (R$${p.price}): ${p.description}. Características: ${p.features.join(', ')}`
  ).join('\n');

  return `Você é o Concierge IA da "Achadinhos Maternidade", uma marca de lifestyle orgânico e acolhedor.
Seu tom é calmo, convidativo, gentil e sofisticado. Prefira palavras como "natural", "aconchegante", "suave" e "cuidado".

Catálogo de produtos atual:
${productContext}

Responda perguntas sobre especificações, recomendações e filosofia da marca.
Mantenha as respostas concisas (normalmente menos de 3 frases) para caber na UI do chat.
Se perguntado sobre produtos fora do catálogo, redirecione gentilmente para os produtos da Achadinhos Maternidade.`;
})();

// ─────────────────────────────────────────────────────────────
// Utilitário de hash de cache (djb2 sobre o texto do histórico)
// ─────────────────────────────────────────────────────────────
const hashChatKey = (
  history: { role: string; text: string }[],
  newMessage: string,
  prefix: string
): string => {
  let hash = 5381;
  const str =
    history.map(h => `${h.role}:${h.text}`).join('|') + '|' + newMessage;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return `${prefix}_${history.length}_${hash}`;
};

// ─────────────────────────────────────────────────────────────
// GeminiAdapter
// ─────────────────────────────────────────────────────────────
export const GeminiAdapter: AIAdapter = {
  provider: 'gemini' as AIProvider,

  sendMessage: async (history, newMessage, mode) => {
    const cacheKey = hashChatKey(history, newMessage, 'gemini_chat');
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) return cachedResponse;

    try {
      const ai = aiFactory.getInstance();
      const model =
        mode === 'fast'
          ? 'gemini-3.1-flash-lite-preview'
          : 'gemini-3.1-pro-preview';

      const chat = ai.chats.create({
        model,
        config: { systemInstruction: SYSTEM_INSTRUCTION },
        history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      });

      const result = await chat.sendMessage({ message: newMessage });
      const responseText = result.text || '';

      cache.set(cacheKey, responseText);
      return responseText;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Desculpe, estou com dificuldades para processar sua solicitação no momento.';
    }
  },

  generateImage: async (prompt, aspectRatio = '1:1') => {
    const cacheKey = `gemini_image_${prompt}`;
    const cachedImage = cache.get(cacheKey);
    if (cachedImage) return cachedImage;

    try {
      const ai = aiFactory.getInstance();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio, imageSize: '1K' } },
      });

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          cache.set(cacheKey, imageUrl);
          return imageUrl;
        }
      }
      return null;
    } catch (error) {
      console.error('Gemini Image Generation Error:', error);
      return null;
    }
  },
};

// ─────────────────────────────────────────────────────────────
// AnthropicAdapter (re-exportado do módulo dedicado)
// ─────────────────────────────────────────────────────────────
export { AnthropicAdapter } from './anthropicAdapter';

// ─────────────────────────────────────────────────────────────
// getAdapter — seleção dinâmica de provedor
// ─────────────────────────────────────────────────────────────
/**
 * Retorna o adaptador correto para o provedor informado.
 * Fallback: GeminiAdapter se o provedor não for reconhecido.
 *
 * @example
 *   const adapter = getAdapter('anthropic');
 *   const reply = await adapter.sendMessage(history, msg, 'fast');
 */
export const getAdapter = (provider: AIProvider): AIAdapter => {
  switch (provider) {
    case 'anthropic': {
      // Importação lazy para evitar instanciar o cliente quando não necessário
      const { AnthropicAdapter } = require('./anthropicAdapter');
      return AnthropicAdapter;
    }
    case 'gemini':
    default:
      return GeminiAdapter;
  }
};

/**
 * Retorna o provedor configurado via variável de ambiente.
 * Padrão: 'gemini'
 */
export const getDefaultProvider = (): AIProvider => {
  const env = process.env.VITE_DEFAULT_AI_PROVIDER;
  if (env === 'anthropic' || env === 'gemini') return env;
  return 'gemini';
};
