import { test, expect } from '../../fixtures/pages';
import { users } from '../../data/users';
import { errorMessages } from '../../data/messages';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should login successfully with performanceGlitch user', async ({ loginPage, page }) => {
    await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.lockedOut);
  });

  const invalidLogins = [
    { name: 'empty username', username: '', password: 'secret_sauce', error: errorMessages.usernameRequired },
    { name: 'empty password', username: 'standard_user', password: '', error: errorMessages.passwordRequired },
    { name: 'invalid credentials', username: 'wrong_user', password: 'wrong_pass', error: errorMessages.invalidCredentials },
  ];

  for (const { name, username, password, error } of invalidLogins) {
    test(`should show error with ${name}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toContainText(error);
    });
  }
});