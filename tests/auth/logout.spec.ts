import { env } from '@config/env';
import { test, expect } from '@fixtures/test';
import { DashboardPage } from '@pages/dashboard.page';
import { LoginPage } from '@pages/login.page';

test.describe('Session lifecycle', () => {
  test('logs out and invalidates protected navigation', async ({ authPage }) => {
    const normalizePathname = (pathname: string): string =>
      pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    const authenticatedDashboard = new DashboardPage(authPage);
    await authenticatedDashboard.logout();
    await authPage.goto(env.protectedPath);

    const loginPage = new LoginPage(authPage);
    await loginPage.waitForReady();
    await expect
      .poll(() => normalizePathname(new URL(authPage.url()).pathname))
      .toBe(normalizePathname(new URL(env.loginPath, env.baseUrl).pathname));
  });
});
