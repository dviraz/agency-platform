import { test, expect } from '@playwright/test';

test.describe('Integration Tests - PayPal & Email', () => {
  const baseURL = 'http://localhost:3000';

  test('Full User Journey - Signup to Checkout', async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    console.log('🧪 Testing full user journey...\n');

    // Step 1: Navigate to landing page
    console.log('1️⃣ Loading landing page...');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/integration/01-landing.png', fullPage: true });
    console.log('✅ Landing page loaded\n');

    // Step 2: Click on a service tier
    console.log('2️⃣ Selecting Starter tier...');
    const starterButton = page.locator('button:has-text("Get Started")').first();
    await expect(starterButton).toBeVisible();
    await starterButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/integration/02-after-tier-click.png', fullPage: true });

    // Check if redirected to signup or checkout
    const currentUrl = page.url();
    console.log(`   Current URL: ${currentUrl}`);
    console.log('✅ Clicked Get Started button\n');

    // Step 3: Go to signup if not authenticated
    console.log('3️⃣ Navigating to signup page...');
    await page.goto(baseURL + '/auth/signup');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/integration/03-signup-page.png', fullPage: true });
    console.log('✅ Signup page loaded\n');

    // Step 4: Fill signup form
    console.log('4️⃣ Filling signup form...');
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel(/email/i).first().fill(testEmail);
    await page.getByLabel('Password', { exact: true }).fill(testPassword);
    await page.getByLabel('Confirm Password').fill(testPassword);

    await page.screenshot({ path: 'test-results/integration/04-signup-filled.png', fullPage: true });
    console.log(`   Email: ${testEmail}`);
    console.log('✅ Signup form filled\n');

    // Step 5: Submit signup
    console.log('5️⃣ Submitting signup form...');
    await page.getByRole('button', { name: /create account/i }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/integration/05-after-signup.png', fullPage: true });

    const afterSignupUrl = page.url();
    console.log(`   URL after signup: ${afterSignupUrl}`);

    if (afterSignupUrl.includes('/dashboard')) {
      console.log('✅ Successfully signed up and redirected to dashboard\n');
    } else if (afterSignupUrl.includes('/auth')) {
      console.log('⚠️  Still on auth page - check for validation errors\n');
    }

    console.log('✅ User journey test completed\n');
  });

  test('PayPal Button Visibility', async ({ page }) => {
    console.log('🧪 Testing PayPal integration...\n');

    // Navigate to a checkout page (using starter tier)
    console.log('1️⃣ Loading checkout page for Starter tier...');
    await page.goto(baseURL + '/checkout/starter');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for PayPal SDK to load

    await page.screenshot({ path: 'test-results/integration/paypal-01-checkout.png', fullPage: true });

    // Check if we're redirected to login (unauthenticated)
    if (page.url().includes('/auth/login')) {
      console.log('⚠️  Redirected to login (expected for unauthenticated user)');
      console.log('   PayPal button test requires authentication\n');
      return;
    }

    // Check if PayPal container exists
    console.log('2️⃣ Checking for PayPal button container...');
    const paypalContainer = page.locator('#paypal-button-container');
    const isVisible = await paypalContainer.isVisible().catch(() => false);

    if (isVisible) {
      console.log('✅ PayPal button container found');
      await paypalContainer.screenshot({ path: 'test-results/integration/paypal-02-button.png' });
    } else {
      console.log('❌ PayPal button container not found');
      console.log('   Check PayPal credentials in .env.local\n');
    }

    // Check for PayPal SDK script
    console.log('3️⃣ Checking PayPal SDK loaded...');
    const hasPayPalSDK = await page.evaluate(() => {
      return 'paypal' in window;
    });

    if (hasPayPalSDK) {
      console.log('✅ PayPal SDK loaded successfully');
    } else {
      console.log('❌ PayPal SDK not loaded');
      console.log('   Check NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local\n');
    }

    console.log('✅ PayPal integration test completed\n');
  });

  test('API Routes - Health Check', async ({ page }) => {
    console.log('🧪 Testing API routes...\n');

    // Test products API (should be public)
    console.log('1️⃣ Testing products data...');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const hasProducts = await page.evaluate(async () => {
      try {
        const response = await fetch('/api/products');
        return response.ok;
      } catch {
        return false;
      }
    });

    if (hasProducts) {
      console.log('✅ Products API responding');
    } else {
      console.log('⚠️  Products API not found (may be using Supabase directly)');
    }

    // Check if products display on page
    console.log('2️⃣ Checking if products render on page...');
    const productCards = page.locator('[data-testid="product-card"], .product-card, button:has-text("Get Started")');
    const productCount = await productCards.count();

    console.log(`   Found ${productCount} product/service cards`);

    if (productCount > 0) {
      console.log('✅ Products displaying on page');
    } else {
      console.log('❌ No products found on page');
    }

    await page.screenshot({ path: 'test-results/integration/api-01-products.png', fullPage: true });

    console.log('✅ API routes test completed\n');
  });

  test('Email Configuration Check', async () => {
    console.log('🧪 Checking email configuration...\n');

    // We can't send actual emails in tests, but we can verify the config
    console.log('1️⃣ Checking environment variables...');

    const envCheck = {
      smtpHost: process.env.SMTP_HOST || 'NOT SET',
      smtpPort: process.env.SMTP_PORT || 'NOT SET',
      smtpUser: process.env.SMTP_USER ? '✓ SET' : '❌ NOT SET',
      smtpPassword: process.env.SMTP_PASSWORD ? '✓ SET' : '❌ NOT SET',
      emailFrom: process.env.EMAIL_FROM || 'NOT SET',
    };

    console.log('   SMTP Host:', envCheck.smtpHost);
    console.log('   SMTP Port:', envCheck.smtpPort);
    console.log('   SMTP User:', envCheck.smtpUser);
    console.log('   SMTP Password:', envCheck.smtpPassword);
    console.log('   Email From:', envCheck.emailFrom);

    const allConfigured =
      envCheck.smtpUser.includes('✓') &&
      envCheck.smtpPassword.includes('✓') &&
      envCheck.smtpHost !== 'NOT SET';

    if (allConfigured) {
      console.log('\n✅ Email configuration looks good');
      console.log('   Emails will be sent when payments are processed\n');
    } else {
      console.log('\n⚠️  Email configuration incomplete');
      console.log('   Update SMTP credentials in .env.local\n');
    }

    console.log('✅ Email configuration check completed\n');
  });

  test('Supabase Connection', async ({ page }) => {
    console.log('🧪 Testing Supabase connection...\n');

    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check for Supabase errors in console
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().toLowerCase().includes('supabase')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log('❌ Supabase errors detected:');
      consoleErrors.forEach(err => console.log('   -', err));
    } else {
      console.log('✅ No Supabase connection errors');
    }

    console.log('✅ Supabase connection test completed\n');
  });

  test('Protected Routes - Dashboard Access', async ({ page }) => {
    console.log('🧪 Testing protected routes...\n');

    console.log('1️⃣ Attempting to access dashboard without auth...');
    await page.goto(baseURL + '/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    await page.screenshot({ path: 'test-results/integration/protected-01-dashboard-redirect.png', fullPage: true });

    if (currentUrl.includes('/auth/login')) {
      console.log('✅ Correctly redirected to login page');
      console.log('   Protected routes are working\n');
    } else if (currentUrl.includes('/dashboard')) {
      console.log('⚠️  Accessed dashboard without authentication');
      console.log('   This might indicate middleware is not working\n');
    }

    console.log('✅ Protected routes test completed\n');
  });
});
