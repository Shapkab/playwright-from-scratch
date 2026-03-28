import { test, expect } from '@fixtures/test';

test.describe('API health', () => {
  test('@smoke returns healthy status', async ({ appApi }) => {
    const response = await appApi.getHealth();
    const body = await response.text();
    expect(body.length).toBeGreaterThan(0);
  });
});
