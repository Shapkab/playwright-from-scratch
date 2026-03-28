import { env } from '@config/env';
import { test, expect } from '@fixtures/test';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('UI and API consistency', () => {
  test('shows the same signed-in user as the profile endpoint', async ({ authPage, authApi }) => {
    const dashboardPage = new DashboardPage(authPage);
    const uiEmail = await dashboardPage.readSignedInUserEmail();

    const response = await authApi.getCurrentUser();
    const body = (await response.json()) as { email?: string };

    expect(uiEmail).toBeTruthy();
    expect(body.email, 'Expected profile response to include email field. Adjust mapping if your contract differs.').toBeTruthy();
    expect(uiEmail).toContain(body.email ?? env.userEmail);
  });
});
