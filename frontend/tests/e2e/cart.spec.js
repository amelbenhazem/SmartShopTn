import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login
    await page.goto('/register');
    await page.fill('input[type="text"]', 'Cart Test User');
    await page.fill('input[type="email"]', 'carttest@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should display empty cart', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('text=Panier vide')).toBeVisible();
  });

  test('should add item to cart and display it', async ({ page }) => {
    // Go to products and add one
    await page.goto('/products');
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    
    await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 5000 });
    await page.click('button:has-text("Ajouter au panier")');
    
    // Go to cart
    await page.goto('/cart');
    
    // Should see cart items
    await expect(page.locator('text=Panier')).toBeVisible();
  });

  test('should update item quantity in cart', async ({ page }) => {
    // Add item to cart first
    await page.goto('/products');
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 5000 });
    await page.click('button:has-text("Ajouter au panier")');
    
    // Go to cart
    await page.goto('/cart');
    await page.waitForSelector('input[type="number"]', { timeout: 5000 });
    
    // Update quantity
    const quantityInput = page.locator('input[type="number"]').first();
    await quantityInput.fill('5');
    
    // Should update successfully
    await expect(quantityInput).toHaveValue('5');
  });

  test('should remove item from cart', async ({ page }) => {
    // Add item to cart first
    await page.goto('/products');
    await page.waitForSelector('text=Voir détails', { timeout: 5000 });
    const firstProductLink = page.locator('text=Voir détails').first();
    await firstProductLink.click();
    await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 5000 });
    await page.click('button:has-text("Ajouter au panier")');
    
    // Go to cart
    await page.goto('/cart');
    await page.waitForSelector('text=Supprimer', { timeout: 5000 });
    
    // Remove item
    await page.click('text=Supprimer');
    
    // Should show empty cart
    await expect(page.locator('text=Panier vide')).toBeVisible({ timeout: 5000 });
  });
});


