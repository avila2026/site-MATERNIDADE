/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  category: 'Quarto' | 'Vestuário' | 'Passeio' | 'Higiene' | 'Acessórios' | 'Brinquedos';
  imageUrl: string;
  gallery?: string[];
  features: string[];
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  imageUrl?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type ViewState =
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'checkout' }
  | { type: 'admin' };

/**
 * AI Provider identifier.
 * - "gemini"    → Google Gemini (requer GEMINI_API_KEY)
 * - "anthropic" → Anthropic Claude (requer ANTHROPIC_API_KEY)
 */
export type AIProvider = 'gemini' | 'anthropic';

/**
 * Unified interface implemented by every AI adapter.
 * New providers must implement this contract.
 */
export interface AIAdapter {
  provider: AIProvider;
  /** Send a chat message and receive a text reply. */
  sendMessage(
    history: { role: string; text: string }[],
    newMessage: string,
    mode: 'fast' | 'complex'
  ): Promise<string>;
  /** Generate an image from a text prompt. Returns null if unsupported. */
  generateImage(prompt: string, aspectRatio?: string): Promise<string | null>;
}
