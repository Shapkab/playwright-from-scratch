import { env } from '@config/env';
import { test } from '@fixtures/test';

test.describe('Negative authentication', () => {
  test('rejects invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginExpectingFailure(env.userEmail, env.invalidPassword);
  });
});
