// Limitador simples em memória (janela fixa por chave).
// Em hospedagem serverless cada instância tem sua própria memória, então ele reduz
// abusos repetidos de uma mesma origem, mas não substitui uma proteção da plataforma.

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export type RateLimiter = (key: string) => RateLimitResult;

export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
  now?: () => number;
}): RateLimiter {
  const { limit, windowMs, maxKeys = 5000, now = Date.now } = options;
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (key) => {
    const current = now();

    if (hits.size >= maxKeys) {
      for (const [storedKey, entry] of hits) {
        if (entry.resetAt <= current) hits.delete(storedKey);
      }
      // Se ainda estiver cheio, descarta as entradas mais antigas.
      while (hits.size >= maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest === undefined) break;
        hits.delete(oldest);
      }
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= current) {
      hits.set(key, { count: 1, resetAt: current + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    entry.count += 1;
    if (entry.count > limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - current) / 1000) };
    }
    return { allowed: true, retryAfterSeconds: 0 };
  };
}
