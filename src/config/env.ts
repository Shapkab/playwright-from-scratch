import dotenv from 'dotenv';

dotenv.config();

const get = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const getNumber = (name: string, fallback: number): number => {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number. Got: ${raw}`);
  }
  return parsed;
};

export const env = {
  baseUrl: get('BASE_URL'),
  apiBaseUrl: get('API_BASE_URL', get('BASE_URL')),
  loginPath: get('LOGIN_PATH', '/login'),
  dashboardPath: get('DASHBOARD_PATH', '/dashboard'),
  protectedPath: get('PROTECTED_PATH', get('DASHBOARD_PATH', '/dashboard')),
  userEmail: get('USER_EMAIL'),
  userPassword: get('USER_PASSWORD'),
  invalidPassword: get('INVALID_PASSWORD', 'invalid-password'),
  healthEndpoint: get('HEALTH_ENDPOINT', '/health'),
  profileEndpoint: get('PROFILE_ENDPOINT', '/api/me'),
  defaultTimeoutMs: getNumber('DEFAULT_TIMEOUT_MS', 10000),
  expectTimeoutMs: getNumber('EXPECT_TIMEOUT_MS', 10000)
};
