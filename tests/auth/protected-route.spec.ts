import { env } from '@config/env';
import { test, expect } from '@fixtures/test';

test.describe('Protected routes', () => {
  test('redirects anonymous user to login page', async ({ page }) => {
    await page.goto(new URL(env.protectedPath, env.baseUrl).toString());
    await expect(page).toHaveURL(new RegExp(`${env.loginPath}`));
  });
});
