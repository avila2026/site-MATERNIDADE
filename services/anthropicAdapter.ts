/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Anthropic Claude adapter for Achadinhos Maternidade.
 * Implementa a interface AIAdapter usando a API do Claude.
 *
 * Modelos usados:
 *   fast    → claude-haiku-4-5-20251001  (respostas rápidas no chat)
 *   complex → claude-sonnet-4-6          (raciocínio avançado, AdminConfig)
 */

import { AIAdapter, AIProvider } from '../types';
import { anthropicFactory } from './anthropicFactory';
import { cache } from './cache';
import { PRODUCTS } from '../constants';

// System instruction compartilhada com o GeminiAdapter para manter consistência.
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

const MODEL_MAP: Record<'fast' | 'complex', string> = {
  fast: 'claude-haiku-4-5-20251001',
  complex: 'claude-sonnet-4-6',
};

/**
 * Gera uma chave de cache leve para histórico + nova mensagem.
 * Usa algoritmo djb2 para evitar JSON.stringify no histórico inteiro.
 */
const hashChatKey = (
  history: { role: string; text: string }[],
  newMessage: string
): string => {
  let hash = 5381;
  const str =
    history.map(h => `${h.role}:${h.text}`).join('|') + '|' + newMessage;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return `anthropic_chat_${history.length}_${hash}`;
};

export const AnthropicAdapter: AIAdapter = {
  provider: 'anthropic' as AIProvider,

  sendMessage: async (history, newMessage, mode) => {
    const cacheKey = hashChatKey(history, newMessage);
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) return cachedResponse;

    try {
      const client = anthropicFactory.getInstance();

      // Converter histórico: 'model' → 'assistant' (formato Anthropic)
      const messages = [
        ...history.map(h => ({
          role: (h.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
          content: h.text,
        })),
        { role: 'user' as const, content: newMessage },
      ];

      const response = await client.messages.create({
        model: MODEL_MAP[mode],
        max_tokens: 1024,
        system: SYSTEM_INSTRUCTION,
        messages,
      });

      const responseText =
        response.content[0]?.type === 'text' ? response.content[0].text : '';

      cache.set(cacheKey, responseText);
      return responseText;
    } catch (error) {
      console.error('Anthropic API Error:', error);
      return 'Desculpe, estou com dificuldades para processar sua solicitação no momento.';
    }
  },

  /**
   * Claude não possui geração de imagens nativa.
   * Retorna null para que o componente exiba mensagem adequada.
   */
  generateImage: async (_prompt: string, _aspectRatio?: string) => {
    console.warn(
      '[AnthropicAdapter] Geração de imagens não suportada. Use o GeminiAdapter.'
    );
    return null;
  },
};
