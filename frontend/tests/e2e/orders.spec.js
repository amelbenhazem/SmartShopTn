import { test, expect } from '@playwright/test';

test.describe('Orders', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Order Test User');
    await page.fill('input[type="email"]', 'ordertest@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should create order from cart', async ({ page }) => {
    // Add item to cart
    await page.goto('/products');
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 5000 });
    await page.click('button:has-text("Ajouter au panier")');
    
    // Go to cart and checkout
    await page.goto('/cart');
    await page.waitForSelector('button:has-text("Valider la commande")', { timeout: 5000 });
    await page.click('button:has-text("Valider la commande")');
    
    // Should redirect to orders page
    await expect(page).toHaveURL(/.*orders/, { timeout: 5000 });
  });

  test('should display orders page', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.locator('text=Mes Commandes')).toBeVisible();
  });
});


