import { defineConfig, devices } from '@playwright/test';
import { env } from '@config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: env.expectTimeoutMs
  },
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: env.baseUrl,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: env.defaultTimeoutMs,
    navigationTimeout: env.defaultTimeoutMs,
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
