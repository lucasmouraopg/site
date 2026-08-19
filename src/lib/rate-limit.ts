import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback in-memory se Upstash não estiver configurado (dev local)
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryCheck(key: string, maxRequests: number, windowSec: number): boolean {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

// Rate limit para login: 5 tentativas / 15 min por IP + lockout por email
export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
    })
  : null;

// Rate limit para login por email: 10 tentativas / 15 min
export const loginEmailRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '15 m'),
      analytics: true,
    })
  : null;

// Rate limit para leads: 3 submissões / 1 hora por IP
export const leadRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
    })
  : null;

// Funções de fallback para dev local (in-memory)
export async function checkLoginLimit(ip: string): Promise<boolean> {
  if (loginRateLimit) {
    const result = await loginRateLimit.limit(ip);
    return result.success;
  }
  return memoryCheck(`login:ip:${ip}`, 5, 900);
}

export async function checkLoginEmailLimit(email: string): Promise<boolean> {
  if (loginEmailRateLimit) {
    const result = await loginEmailRateLimit.limit(email);
    return result.success;
  }
  return memoryCheck(`login:email:${email}`, 10, 900);
}

export async function checkLeadLimit(ip: string): Promise<boolean> {
  if (leadRateLimit) {
    const result = await leadRateLimit.limit(ip);
    return result.success;
  }
  return memoryCheck(`lead:${ip}`, 3, 3600);
}
