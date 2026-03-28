import { env } from '@config/env';
import { test, expect } from '@fixtures/test';

test.describe('Authentication', () => {
  test('@smoke signs in with valid credentials', async ({ loginPage, page, dashboardPage }) => {
    await loginPage.open();
    await loginPage.login(env.userEmail, env.userPassword);
    await dashboardPage.waitForReady();
    await expect(page).toHaveURL(new RegExp(`${env.dashboardPath}$`));
  });
});
