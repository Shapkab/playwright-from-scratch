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

  protected async waitForPathname(path: string): Promise<void> {
    const expectedPath = this.normalizePathname(new URL(path, env.baseUrl).pathname);
    await expect
      .poll(() => this.normalizePathname(new URL(this.page.url()).pathname), {
        timeout: env.expectTimeoutMs
      })
      .toBe(expectedPath);
  }

  protected toUrl(path: string): string {
    return new URL(path, env.baseUrl).toString();
  }

  private normalizePathname(pathname: string): string {
    if (pathname.length > 1 && pathname.endsWith('/')) {
      return pathname.slice(0, -1);
    }
    return pathname;
  }
}
