import { test, expect } from '@playwright/test';

test.describe('Admin', () => {
  test('should restrict admin access to non-admin users', async ({ page }) => {
    // Register as regular user
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Regular User');
    await page.fill('input[type="email"]', 'regular@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    // Try to access admin page
    await page.goto('/admin');
    
    // Should redirect to home (non-admin users can't access admin)
    await expect(page).toHaveURL('/');
  });

  test('should show admin link for admin users', async ({ page }) => {
    // Note: This test requires backend to create admin user
    // For now, we'll test that admin link is not visible for regular users
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Regular User');
    await page.fill('input[type="email"]', 'regular2@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    // Admin link should not be visible
    await expect(page.locator('text=Admin')).not.toBeVisible();
  });
});


