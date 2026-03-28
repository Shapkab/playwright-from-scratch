import { env } from '@config/env';
import { test, expect } from '@fixtures/test';

test.describe('Protected routes', () => {
  test('redirects anonymous user to login page', async ({ page }) => {
    const normalizePathname = (pathname: string): string =>
      pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    await page.goto(new URL(env.protectedPath, env.baseUrl).toString());
    await expect
      .poll(() => normalizePathname(new URL(page.url()).pathname))
      .toBe(normalizePathname(new URL(env.loginPath, env.baseUrl).pathname));
  });
});
