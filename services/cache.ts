/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const CACHE_PREFIX = 'am_cache_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_ENTRIES = 50;

interface CacheEntry {
  value: string;
  expiresAt: number;
}

export const cache = {
  get: (key: string): string | null => {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      const entry: CacheEntry = JSON.parse(raw);
      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return entry.value;
    } catch (e) {
      console.warn("Cache get failed", e);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      // Evict the oldest entry when the cache is full.
      const cacheKeys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
      if (cacheKeys.length >= MAX_CACHE_ENTRIES) {
        let oldestKey: string | null = null;
        let oldestExpiry = Infinity;
        for (const k of cacheKeys) {
          try {
            const raw = localStorage.getItem(k);
            if (!raw) continue;
            const entry: CacheEntry = JSON.parse(raw);
            if ((entry.expiresAt ?? 0) < oldestExpiry) {
              oldestExpiry = entry.expiresAt ?? 0;
              oldestKey = k;
            }
          } catch { /* skip malformed entries */ }
        }
        if (oldestKey) localStorage.removeItem(oldestKey);
      }
      const entry: CacheEntry = { value, expiresAt: Date.now() + CACHE_TTL_MS };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch (e) {
      console.warn("Cache set failed", e);
    }
  },
};
