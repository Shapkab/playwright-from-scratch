import { env } from '@config/env';
import { test, expect } from '@fixtures/test';

test.describe('Authentication', () => {
  test('@smoke signs in with valid credentials', async ({ loginPage, page, dashboardPage }) => {
    const normalizePathname = (pathname: string): string =>
      pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    await loginPage.open();
    await loginPage.login(env.userEmail, env.userPassword);
    await dashboardPage.waitForReady();
    await expect
      .poll(() => normalizePathname(new URL(page.url()).pathname))
      .toBe(normalizePathname(new URL(env.dashboardPath, env.baseUrl).pathname));
  });
});
