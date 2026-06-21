const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, reset: entry.resetTime };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS - entry.count,
    reset: entry.resetTime,
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}
