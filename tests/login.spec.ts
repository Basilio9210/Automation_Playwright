import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';
import { errorMessages } from '../data/messages';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.lockedOut);
  });

  // ---- Casos borde parametrizados (nuevo) ----
  const invalidLogins = [
    { name: 'empty username', username: '', password: 'secret_sauce', error: errorMessages.usernameRequired },
    { name: 'empty password', username: 'standard_user', password: '', error: errorMessages.passwordRequired },
    { name: 'wrong password', username: 'standard_user', password: 'wrong_pass', error: errorMessages.invalidCredentials },
  ];

  for (const { name, username, password, error } of invalidLogins) {
    test(`should show error with ${name}`, async () => {
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toContainText(error);
    });
  }
});