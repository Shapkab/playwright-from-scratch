import { test, expect } from '@fixtures/test';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('UI and API consistency', () => {
  test('shows the same signed-in user as the profile endpoint', async ({ authPage, authApi }) => {
    const dashboardPage = new DashboardPage(authPage);
    const uiEmail = await dashboardPage.readSignedInUserEmail();

    const response = await authApi.getCurrentUser();
    const body = (await response.json()) as unknown;

    const isObject = typeof body === 'object' && body !== null;
    expect(isObject, 'Expected profile response to be a JSON object.').toBeTruthy();

    const email = isObject ? (body as Record<string, unknown>).email : undefined;
    expect(typeof email, 'Expected profile response contract: { email: string }.').toBe('string');

    const normalizedUiEmail = uiEmail.trim().toLowerCase();
    const normalizedApiEmail = (email as string).trim().toLowerCase();

    expect(normalizedUiEmail).toBeTruthy();
    expect(normalizedApiEmail).toBeTruthy();
    expect(normalizedUiEmail).toBe(normalizedApiEmail);
  });
});
