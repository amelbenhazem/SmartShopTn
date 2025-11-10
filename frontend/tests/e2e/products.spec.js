import { test, expect } from '@playwright/test';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display products page', async ({ page }) => {
    await page.click('text=Produits');
    await expect(page).toHaveURL(/.*products/);
  });

  test('should display product details', async ({ page }) => {
    await page.goto('/products');
    
    // Wait for products to load
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    
    // Click on first product
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    
    // Should be on product detail page
    await expect(page).toHaveURL(/.*products\/.*/);
  });

  test('should add product to cart when logged in', async ({ page }) => {
    // Login first
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Cart User');
    await page.fill('input[type="email"]', 'cart@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    // Go to products
    await page.goto('/products');
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    
    // Click on first product
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    
    // Add to cart
    await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 5000 });
    await page.click('button:has-text("Ajouter au panier")');
    
    // Should show success message or redirect to cart
    await expect(page.locator('text=Produit ajouté au panier').or(page.locator('text=Panier'))).toBeVisible({ timeout: 5000 });
  });
});


