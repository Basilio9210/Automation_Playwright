import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage); // aquí corre el test
    // lo que pongas después de use() es el teardown
  },
});

export { expect };