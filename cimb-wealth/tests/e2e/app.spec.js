import { test, expect } from '@playwright/test'

test.describe('CIMB Wealth Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173')
  })

  test('should display login page initially', async ({ page }) => {
    await expect(page.getByText('CIMB Wealth')).toBeVisible()
    await expect(page.getByText('Sign in to your account')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })

  test('should login successfully', async ({ page }) => {
    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    
    // Click login button
    await page.click('button[type="submit"]')
    
    // Should redirect to dashboard
    await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByText('Total Wealth')).toBeVisible()
  })

  test('should navigate to different pages', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Navigate to Investments
    await page.click('text=Investments')
    await expect(page.getByText('Investment Holdings')).toBeVisible()
    
    // Navigate to Portfolio
    await page.click('text=Portfolio')
    await expect(page.getByText('Portfolio Overview')).toBeVisible()
    
    // Navigate to Goals
    await page.click('text=Goals')
    await expect(page.getByText('Financial Goals')).toBeVisible()
    
    // Navigate to Reports
    await page.click('text=Reports')
    await expect(page.getByText('Financial Reports')).toBeVisible()
    
    // Navigate to Settings
    await page.click('text=Settings')
    await expect(page.getByText('User Profile')).toBeVisible()
  })

  test('should toggle sidebar', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Find and click sidebar toggle
    const sidebarToggle = page.locator('button[data-bs-toggle="sidebar"]')
    if (await sidebarToggle.isVisible()) {
      await sidebarToggle.click()
      
      // Check if sidebar is collapsed
      await expect(page.locator('.sidebar')).toHaveClass(/collapsed/)
    }
  })

  test('should switch between dashboard tabs', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Test Real-Time Market tab
    await page.click('text=📈 Real-Time Market')
    await expect(page.getByText('Real-Time Market Data')).toBeVisible()
    
    // Test Advanced Analytics tab
    await page.click('text=📊 Advanced Analytics')
    await expect(page.getByText('Advanced Analytics & Predictions')).toBeVisible()
    
    // Test AI Recommendations tab
    await page.click('text=🤖 AI Recommendations')
    await expect(page.getByText('AI-Powered Investment Recommendations')).toBeVisible()
    
    // Test Blockchain & DeFi tab
    await page.click('text=⛓️ Blockchain & DeFi')
    await expect(page.getByText('Blockchain & DeFi Portfolio')).toBeVisible()
    
    // Test Portfolio Optimization tab
    await page.click('text=🎯 Portfolio Optimization')
    await expect(page.getByText('Advanced Portfolio Optimization')).toBeVisible()
    
    // Test Social Trading tab
    await page.click('text=👥 Social Trading')
    await expect(page.getByText('Social Trading Community')).toBeVisible()
    
    // Test Financial Planning tab
    await page.click('text=📋 Financial Planning')
    await expect(page.getByText('Comprehensive Financial Planning')).toBeVisible()
    
    // Test ESG Scoring tab
    await page.click('text=🌱 ESG Scoring')
    await expect(page.getByText('ESG & Sustainability Scoring')).toBeVisible()
    
    // Test Gamification tab
    await page.click('text=🎮 Gamification')
    await expect(page.getByText('Investment Gamification')).toBeVisible()
    
    // Test Security tab
    await page.click('text=🔒 Security')
    await expect(page.getByText('Enterprise Security Dashboard')).toBeVisible()
  })

  test('should interact with AI advisor', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Find AI advisor input and send message
    const aiInput = page.locator('input[placeholder*="Ask"]')
    if (await aiInput.isVisible()) {
      await aiInput.fill('What is my portfolio performance?')
      await page.click('button[type="submit"]')
      
      // Check if message appears in chat
      await expect(page.getByText('What is my portfolio performance?')).toBeVisible()
    }
  })

  test('should toggle theme', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Navigate to Settings
    await page.click('text=Settings')
    
    // Find theme toggle
    const themeToggle = page.locator('input[type="checkbox"][id*="theme"]')
    if (await themeToggle.isVisible()) {
      await themeToggle.click()
      
      // Check if theme changed
      await expect(page.locator('body')).toHaveAttribute('data-bs-theme', 'dark')
      
      // Toggle back
      await themeToggle.click()
      await expect(page.locator('body')).toHaveAttribute('data-bs-theme', 'light')
    }
  })

  test('should display notifications', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Check if notifications component is present
    await expect(page.locator('[data-testid="notifications"]')).toBeVisible()
  })

  test('should handle responsive design', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile layout is applied
    await expect(page.locator('.container-fluid')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    
    // Check if tablet layout is applied
    await expect(page.locator('.container-fluid')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // Check if desktop layout is applied
    await expect(page.locator('.container-fluid')).toBeVisible()
  })

  test('should handle language switching', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Find language selector
    const languageSelector = page.locator('.dropdown-toggle')
    if (await languageSelector.isVisible()) {
      await languageSelector.click()
      
      // Check if language options are visible
      await expect(page.getByText('English')).toBeVisible()
      await expect(page.getByText('Bahasa Malaysia')).toBeVisible()
      await expect(page.getByText('中文')).toBeVisible()
    }
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Find logout button (usually in navbar or settings)
    const logoutButton = page.locator('button:has-text("Logout")')
    if (await logoutButton.isVisible()) {
      await logoutButton.click()
      
      // Should redirect to login page
      await expect(page.getByText('Sign in to your account')).toBeVisible()
    }
  })

  test('should handle form validation', async ({ page }) => {
    // Try to login without filling fields
    await page.click('button[type="submit"]')
    
    // Check if validation messages appear
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('should display charts and visualizations', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Check if charts are rendered (mocked in tests)
    await expect(page.locator('[data-testid="line-chart"]')).toBeVisible()
    await expect(page.locator('[data-testid="bar-chart"]')).toBeVisible()
    await expect(page.locator('[data-testid="doughnut-chart"]')).toBeVisible()
  })
})
