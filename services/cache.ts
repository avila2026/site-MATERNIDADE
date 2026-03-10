/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const cache = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Cache get failed", e);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Cache set failed", e);
    }
  },
};
