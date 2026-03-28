import { expect, Locator, Page } from '@playwright/test';
import { env } from '@config/env';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract readonly root: Locator;

  async waitForReady(): Promise<void> {
    await expect(this.root).toBeVisible({ timeout: env.expectTimeoutMs });
  }

  protected toUrl(path: string): string {
    return new URL(path, env.baseUrl).toString();
  }
}
