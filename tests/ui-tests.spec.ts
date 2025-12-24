import { test, expect } from '@playwright/test';

test.describe('Agency Platform UI/UX Tests', () => {
  const baseURL = 'http://localhost:3000';

  // Take screenshots of all major pages
  test('Landing Page - Hero and Services', async ({ page }) => {
    await page.goto(baseURL);
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/01-landing-page.png', 
      fullPage: true 
    });
    
    // Check for critical elements
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h1 >> text=Transform Your').first()).toBeVisible();
    
    console.log('✓ Landing page rendered successfully');
  });

  test('Service Tiers Section', async ({ page }) => {
    await page.goto(baseURL + '/#services');
    await page.waitForLoadState('networkidle');
    
    // Scroll to services section
    await page.evaluate(() => {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    await page.screenshot({ 
      path: 'test-results/screenshots/02-service-tiers.png',
      fullPage: true
    });
    
    console.log('✓ Service tiers section captured');
  });

  test('Products Grid Section', async ({ page }) => {
    await page.goto(baseURL + '/#products');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/screenshots/03-products-grid.png',
      fullPage: true
    });
    
    console.log('✓ Products grid section captured');
  });

  test('Login Page', async ({ page }) => {
    await page.goto(baseURL + '/auth/login');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/screenshots/04-login-page.png',
      fullPage: true
    });
    
    // Check form elements
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    
    console.log('✓ Login page rendered successfully');
  });

  test('Signup Page', async ({ page }) => {
    await page.goto(baseURL + '/auth/signup');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/screenshots/05-signup-page.png',
      fullPage: true
    });
    
    // Check form elements
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Confirm Password')).toBeVisible();
    
    console.log('✓ Signup page rendered successfully');
  });

  test('Checkout Success Page', async ({ page }) => {
    await page.goto(baseURL + '/checkout/success?orderId=test-123');
    await page.waitForLoadState('networkidle');
    
    // Wait for Suspense to resolve
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/screenshots/06-checkout-success.png',
      fullPage: true
    });
    
    await expect(page.locator('h1:has-text("Payment Successful!")')).toBeVisible();
    
    console.log('✓ Checkout success page rendered successfully');
  });

  test('Header Navigation - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of header
    const header = page.locator('header');
    await header.screenshot({ 
      path: 'test-results/screenshots/07-header-desktop.png'
    });
    
    // Check navigation items in header
    await expect(page.locator('header >> a:has-text("Services")').first()).toBeVisible();
    await expect(page.locator('header >> a:has-text("Products")').first()).toBeVisible();
    
    console.log('✓ Desktop header navigation captured');
  });

  test('Header Navigation - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/screenshots/08-mobile-landing.png',
      fullPage: true
    });
    
    // Check mobile menu button exists
    const menuButton = page.getByRole('button', { name: /open main menu/i });
    await expect(menuButton).toBeVisible();
    
    // Click to open mobile menu
    await menuButton.click();
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'test-results/screenshots/09-mobile-menu-open.png',
      fullPage: true
    });
    
    console.log('✓ Mobile navigation captured');
  });

  test('Console Errors Check', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // Navigate to other pages
    await page.goto(baseURL + '/auth/login');
    await page.waitForLoadState('networkidle');
    
    await page.goto(baseURL + '/auth/signup');
    await page.waitForLoadState('networkidle');
    
    if (consoleErrors.length > 0) {
      console.log('⚠ Console Errors Found:');
      consoleErrors.forEach(err => console.log('  -', err));
    } else {
      console.log('✓ No console errors detected');
    }
  });

  test('Responsive Design - Tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/screenshots/10-tablet-view.png',
      fullPage: true
    });
    
    console.log('✓ Tablet view captured');
  });

  test('Check Animation Performance', async ({ page }) => {
    await page.goto(baseURL);
    
    // Measure page load performance
    const performanceTiming = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        responseTime: timing.responseEnd - timing.requestStart,
      };
    });
    
    console.log('Performance Metrics:');
    console.log(`  Load Time: ${performanceTiming.loadTime}ms`);
    console.log(`  DOM Ready: ${performanceTiming.domReady}ms`);
    console.log(`  Response Time: ${performanceTiming.responseTime}ms`);
    
    // Take screenshot after animations
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: 'test-results/screenshots/11-after-animations.png',
      fullPage: true
    });
  });
});
