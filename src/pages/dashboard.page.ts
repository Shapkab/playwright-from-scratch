import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@core/base.page';
import { selectors } from '@config/selectors';
import { env } from '@config/env';

export class DashboardPage extends BasePage {
  readonly root: Locator;
  readonly userMenuTrigger: Locator;
  readonly userEmailLabel: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator(selectors.dashboard.root);
    this.userMenuTrigger = page.locator(selectors.shell.userMenuTrigger);
    this.userEmailLabel = page.locator(selectors.shell.userEmailLabel);
    this.logoutButton = page.locator(selectors.shell.logoutButton);
  }

  async open(): Promise<void> {
    await this.page.goto(this.toUrl(env.dashboardPath));
    await this.waitForReady();
  }

  async readSignedInUserEmail(): Promise<string> {
    await expect(this.userEmailLabel).toBeVisible({ timeout: env.expectTimeoutMs });
    return (await this.userEmailLabel.textContent())?.trim() ?? '';
  }

  async logout(): Promise<void> {
    await this.userMenuTrigger.click();
    await this.logoutButton.click();
    await this.waitForPathname(env.loginPath);
  }
}
