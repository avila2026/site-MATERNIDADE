/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Anthropic from '@anthropic-ai/sdk';

const getApiKey = (): string => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY environment variable is required');
  return key;
};

// Singleton: reuse a single Anthropic instance across all API calls.
let _instance: Anthropic | null = null;

export const anthropicFactory = {
  getInstance: (): Anthropic => {
    if (!_instance) {
      _instance = new Anthropic({
        apiKey: getApiKey(),
        // Required for browser-side usage.
        // For production, proxy requests through your backend instead.
        dangerouslyAllowBrowser: true,
      });
    }
    return _instance;
  },
};
