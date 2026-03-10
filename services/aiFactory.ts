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

export const aiFactory = {
    getInstance: () => new GoogleGenAI({ apiKey: getApiKey() }),
};
