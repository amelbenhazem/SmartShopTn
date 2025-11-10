import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await page.click('text=Connexion');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('h1')).toContainText('Connexion');
  });

  test('should display register page', async ({ page }) => {
    await page.click('text=Inscription');
    await expect(page).toHaveURL(/.*register/);
    await expect(page.locator('h1')).toContainText('Inscription');
  });

  test('should register a new user', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should redirect to home after registration
    await expect(page).toHaveURL('/');
  });

  test('should login with valid credentials', async ({ page }) => {
    // First register a user
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'login@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    // Logout
    await page.click('text=Déconnexion');

    // Login
    await page.click('text=Connexion');
    await page.fill('input[type="email"]', 'login@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Test User')).toBeVisible();
  });
});


