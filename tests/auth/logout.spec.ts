import { test, expect } from '@fixtures/test';
import { LoginPage } from '@pages/login.page';

test.describe('Session lifecycle', () => {
  test('logs out and invalidates protected navigation', async ({ authPage, dashboardPage }) => {
    const authenticatedDashboard = new DashboardPage(authPage);
    await authenticatedDashboard.logout();
    await authPage.goBack();
    const loginPage = new LoginPage(authPage);
    await loginPage.waitForReady();
    await expect(authPage).toHaveURL(/login/);
  });
});
