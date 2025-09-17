# CIMB Wealth Testing Guide

## Overview
This document provides comprehensive testing guidelines for the CIMB Wealth Financial Application. The testing suite includes unit tests, integration tests, and end-to-end tests.

## Testing Framework
- **Unit Tests**: Vitest + React Testing Library
- **Integration Tests**: Vitest + React Testing Library + Redux Testing
- **End-to-End Tests**: Playwright
- **Coverage**: Vitest Coverage with v8 provider

## Test Structure

```
src/
├── test/
│   ├── setup.js              # Test setup and mocks
│   ├── utils.js               # Test utilities and helpers
│   ├── store.test.js          # Redux store unit tests
│   ├── Dashboard.test.jsx     # Dashboard component tests
│   ├── AIRecommendations.test.jsx # AI component tests
│   └── App.integration.test.jsx   # App integration tests
tests/
└── e2e/
    └── app.spec.js            # End-to-end tests
```

## Running Tests

### Unit Tests
```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

### All Tests
```bash
# Run all tests (unit + E2E)
npm run test:all
```

## Test Categories

### 1. Unit Tests
Test individual components and functions in isolation.

**Coverage:**
- Component rendering
- Props handling
- Event handlers
- State management
- Utility functions

**Example:**
```javascript
it('should render dashboard widgets', () => {
  renderWithProviders(<Dashboard />)
  expect(screen.getByTestId('dashboard-widgets')).toBeInTheDocument()
})
```

### 2. Integration Tests
Test component interactions and Redux store integration.

**Coverage:**
- Component communication
- Redux store actions
- State updates
- Route navigation
- API integration

**Example:**
```javascript
it('should handle login action', () => {
  const user = { id: 1, name: 'Test User' }
  store.dispatch(login(user))
  
  const state = store.getState()
  expect(state.auth.user).toEqual(user)
})
```

### 3. End-to-End Tests
Test complete user workflows across the application.

**Coverage:**
- User authentication
- Navigation flows
- Form submissions
- Data interactions
- Responsive design

**Example:**
```javascript
test('should login successfully', async ({ page }) => {
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await expect(page.getByText('Dashboard')).toBeVisible()
})
```

## Test Utilities

### renderWithProviders
Custom render function that includes Redux Provider and Router.

```javascript
import { renderWithProviders } from './utils'

renderWithProviders(<Component />, {
  preloadedState: { auth: { user: mockUser } }
})
```

### Mock Data Factories
Create consistent test data.

```javascript
import { createMockUser, createMockInvestment } from './utils'

const user = createMockUser({ name: 'Custom Name' })
const investment = createMockInvestment({ ticker: 'CUSTOM' })
```

### Custom Matchers
Extended assertions for better test readability.

```javascript
import { expectElementToBeInDocument, expectElementToHaveText } from './utils'

expectElementToBeInDocument(element)
expectElementToHaveText(element, 'Expected Text')
```

## Mocking Strategy

### Component Mocks
Mock heavy components to focus on specific functionality.

```javascript
vi.mock('../components/Chart', () => ({
  default: () => <div data-testid="chart">Chart</div>
}))
```

### API Mocks
Mock external API calls for consistent testing.

```javascript
const mockFetch = (data) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
      ok: true,
      status: 200,
    })
  )
}
```

### Browser API Mocks
Mock browser-specific APIs for testing environment.

```javascript
// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
```

## Test Coverage Goals

- **Unit Tests**: 90%+ coverage
- **Integration Tests**: 80%+ coverage
- **E2E Tests**: Critical user paths

## Coverage Reports

Coverage reports are generated in multiple formats:
- **Text**: Console output
- **JSON**: Machine-readable format
- **HTML**: Interactive web report

## CI/CD Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:e2e
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:run && npm run lint"
    }
  }
}
```

## Best Practices

### 1. Test Naming
Use descriptive test names that explain the expected behavior.

```javascript
// Good
it('should display error message when login fails')

// Bad
it('should work')
```

### 2. Test Structure
Follow the AAA pattern: Arrange, Act, Assert.

```javascript
it('should update user risk profile', () => {
  // Arrange
  const user = createMockUser()
  store.dispatch(login(user))
  
  // Act
  store.dispatch(updateRisk('Aggressive'))
  
  // Assert
  const state = store.getState()
  expect(state.auth.user.risk).toBe('Aggressive')
})
```

### 3. Test Isolation
Each test should be independent and not rely on other tests.

### 4. Mock Appropriately
Mock external dependencies but test real component logic.

### 5. Test User Behavior
Focus on testing what users can see and do, not implementation details.

## Debugging Tests

### Vitest Debugging
```bash
# Run specific test file
npm run test src/test/Dashboard.test.jsx

# Run tests matching pattern
npm run test -- --grep "should render"

# Debug mode
npm run test -- --inspect-brk
```

### Playwright Debugging
```bash
# Debug specific test
npx playwright test --debug

# Run in headed mode
npm run test:e2e:headed

# Generate trace
npx playwright test --trace on
```

## Performance Testing

### Component Performance
Test component rendering performance with large datasets.

### E2E Performance
Monitor page load times and interaction responsiveness.

## Accessibility Testing

### Automated A11y Tests
```javascript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('should not have accessibility violations', async () => {
  const { container } = renderWithProviders(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management

## Security Testing

### Input Validation
Test all form inputs for proper validation and sanitization.

### Authentication
Test login/logout flows and session management.

### Authorization
Test role-based access control.

## Maintenance

### Regular Updates
- Keep testing dependencies updated
- Review and update test coverage goals
- Refactor tests when components change

### Test Documentation
- Document complex test scenarios
- Maintain test data documentation
- Keep this guide updated

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or fix async issues
2. **Mock not working**: Check mock placement and scope
3. **E2E tests flaky**: Add proper waits and retries
4. **Coverage not accurate**: Check ignore patterns

### Getting Help
- Check test logs for detailed error messages
- Use debug mode for step-by-step execution
- Review test utilities for helper functions
- Consult framework documentation
