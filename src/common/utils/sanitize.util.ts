export function sanitize(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const sensitiveKeys = ['password', 'token', 'authorization', 'auth', 'apiKey', 'secret'];
  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      result[key] = '***';
    } else if (typeof obj[key] === 'object') {
      result[key] = sanitize(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}
