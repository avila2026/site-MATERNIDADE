/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
    return key;
};

// Singleton: reuse a single GoogleGenAI instance across all API calls.
let _instance: GoogleGenAI | null = null;

export const aiFactory = {
    getInstance: (): GoogleGenAI => {
        if (!_instance) {
            _instance = new GoogleGenAI({ apiKey: getApiKey() });
        }
        return _instance;
    },
};
