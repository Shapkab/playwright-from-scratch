import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@core/base.page';
import { env } from '@config/env';
import { selectors } from '@config/selectors';

export class LoginPage extends BasePage {
  readonly root: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly formError: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator('form');
    this.emailInput = page.locator(selectors.login.emailInput);
    this.passwordInput = page.locator(selectors.login.passwordInput);
    this.submitButton = page.locator(selectors.login.submitButton);
    this.formError = page.locator(selectors.login.formError);
  }

  async open(): Promise<void> {
    await this.page.goto(this.toUrl(env.loginPath));
    await this.waitForReady();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL(`**${env.dashboardPath}`),
      this.submitButton.click()
    ]);
  }

  async loginExpectingFailure(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.formError).toBeVisible({ timeout: env.expectTimeoutMs });
  }
}
