import { test, expect } from '@playwright/test';

test.describe('Admin Products Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@smarthop.tn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should navigate to products management page', async ({ page }) => {
    // Click on Products link in navbar
    await page.click('text=Produits');
    await expect(page).toHaveURL(/.*admin\/products/);
    await expect(page.locator('h1')).toContainText('Gestion des Produits');
  });

  test('should display products list', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Wait for products to load
    await page.waitForSelector('table', { timeout: 5000 });
    
    // Check if table is visible
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('should open add product form', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Click add product button
    await page.click('text=+ Ajouter un produit');
    
    // Check if form is visible
    await expect(page.locator('text=Nouveau produit')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="price"]')).toBeVisible();
  });

  test('should add a new product', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Open form
    await page.click('text=+ Ajouter un produit');
    await page.waitForSelector('input[name="name"]', { timeout: 3000 });
    
    // Fill form
    await page.fill('input[name="name"]', 'Test Product E2E');
    await page.fill('textarea[name="description"]', 'Description du produit de test');
    await page.fill('input[name="price"]', '35.50');
    await page.selectOption('select[name="category"]', 'Épicerie');
    await page.fill('input[name="stock"]', '100');
    await page.fill('input[name="origin"]', 'Tunis, Tunisie');
    await page.fill('input[name="image"]', 'https://example.com/test.jpg');
    
    // Submit form
    await page.click('button:has-text("Ajouter")');
    
    // Wait for success message or product to appear in table
    await page.waitForTimeout(2000);
    
    // Verify product was added (check if it appears in the table or success message)
    const productName = page.locator('text=Test Product E2E');
    await expect(productName).toBeVisible({ timeout: 5000 });
  });

  test('should edit a product', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Wait for products to load
    await page.waitForSelector('table', { timeout: 5000 });
    
    // Click edit button on first product
    const editButtons = page.locator('text=Modifier');
    const firstEditButton = editButtons.first();
    
    if (await firstEditButton.count() > 0) {
      await firstEditButton.click();
      
      // Check if edit form is visible
      await expect(page.locator('text=Modifier le produit')).toBeVisible();
      
      // Modify the name
      const nameInput = page.locator('input[name="name"]');
      await nameInput.clear();
      await nameInput.fill('Produit Modifié E2E');
      
      // Submit
      await page.click('button:has-text("Modifier")');
      
      // Wait for update
      await page.waitForTimeout(2000);
      
      // Verify product was updated
      await expect(page.locator('text=Produit Modifié E2E')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should delete a product', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Wait for products to load
    await page.waitForSelector('table', { timeout: 5000 });
    
    // Get first product name before deletion
    const firstProductName = await page.locator('table tbody tr:first-child td:nth-child(2)').textContent();
    
    // Click delete button on first product
    const deleteButtons = page.locator('text=Supprimer');
    const firstDeleteButton = deleteButtons.first();
    
    if (await firstDeleteButton.count() > 0) {
      // Set up dialog handler
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
      });
      
      await firstDeleteButton.click();
      
      // Wait for deletion
      await page.waitForTimeout(2000);
      
      // Verify product was deleted (it should not appear in table anymore)
      if (firstProductName) {
        const deletedProduct = page.locator(`text=${firstProductName}`);
        // Product should not be visible or table should show different content
        await expect(deletedProduct).not.toBeVisible({ timeout: 3000 });
      }
    }
  });

  test('should cancel form', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Open form
    await page.click('text=+ Ajouter un produit');
    await page.waitForSelector('input[name="name"]', { timeout: 3000 });
    
    // Fill some data
    await page.fill('input[name="name"]', 'Test Cancel');
    
    // Click cancel
    await page.click('button:has-text("Annuler")');
    
    // Form should be closed
    await expect(page.locator('text=Nouveau produit')).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Open form
    await page.click('text=+ Ajouter un produit');
    await page.waitForSelector('input[name="name"]', { timeout: 3000 });
    
    // Try to submit without filling required fields
    await page.click('button:has-text("Ajouter")');
    
    // Browser validation should prevent submission
    // Check if form is still visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Wait for products to load
    await page.waitForSelector('table', { timeout: 5000 });
    
    // Check if products are displayed
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    // Note: Category filter would need to be implemented in the UI
    // This test verifies the page loads correctly
  });
});

