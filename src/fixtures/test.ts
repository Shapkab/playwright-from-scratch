import { test as base, expect, request, APIRequestContext, BrowserContext, Page } from '@playwright/test';
import { env } from '@config/env';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { AppApi } from '@api/app.api';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authPage: Page;
  authContext: BrowserContext;
  appApi: AppApi;
  authApi: AppApi;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  authContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      baseURL: env.baseUrl,
      storageState: { cookies: [], origins: [] }
    });
    await use(context);
    await context.close();
  },

  authPage: async ({ authContext }, use) => {
    const page = await authContext.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.userEmail, env.userPassword);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.waitForReady();
    await use(page);
    await page.close();
  },

  appApi: async ({ playwright }, use) => {
    const apiContext = await request.newContext({
      baseURL: env.apiBaseUrl,
      ignoreHTTPSErrors: true
    });
    await use(new AppApi(apiContext));
    await apiContext.dispose();
  },

  authApi: async ({ playwright, authContext }, use) => {
    const storageState = await authContext.storageState();
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: env.apiBaseUrl,
      storageState,
      ignoreHTTPSErrors: true
    });
    await use(new AppApi(apiContext));
    await apiContext.dispose();
  }
});

export { expect };
