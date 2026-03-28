/**
 * Replace these selectors with stable, app-specific locators.
 * Preferred order:
 * 1) data-testid / data-test-id
 * 2) ARIA role + accessible name
 * 3) semantic labels/placeholders
 * Avoid brittle CSS chains and text fragments.
 */
export const selectors = {
  login: {
    emailInput: '[data-testid="login-email"]',
    passwordInput: '[data-testid="login-password"]',
    submitButton: '[data-testid="login-submit"]',
    formError: '[data-testid="login-error"]'
  },
  shell: {
    userMenuTrigger: '[data-testid="user-menu-trigger"]',
    userEmailLabel: '[data-testid="user-email"]',
    logoutButton: '[data-testid="logout-button"]'
  },
  dashboard: {
    root: '[data-testid="dashboard-root"]'
  }
} as const;
