# Bayzat Frontend Test - Calculator

## Overview

This project is a **basic calculator application** built using **TypeScript** and **React.JS** for the Bayzat Frontend Test assignment. The focus is on demonstrating TypeScript's static typing capabilities, handling JavaScript's calculation quirks, and implementing a clean, maintainable codebase with comprehensive testing.

## Live Demo

🚀 **Deployed on Vercel**: [https://bayzat-calculator-jubstaa.vercel.app](https://bayzat-calculator-jubstaa.vercel.app)

## Features

### ✅ Core Requirements

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Complex Expressions**: Handles series of operations (e.g., 3 + 2 \* 4 - 5) with proper operator precedence
- **Edge Case Handling**: Addresses JavaScript floating-point precision issues
- **Responsive UI**: Works seamlessly across desktop, tablet, and mobile devices
- **Material-UI Integration**: Clean, user-friendly interface using MUI components

### 🎯 Bonus Features

- **Calculation Display**: Shows full expression (e.g., 1 + 3 + 5) before showing result
- **Keyboard Support**: Full keyboard navigation and input support
- **History Tracking**: Maintains calculation history for reference
- **Error Handling**: User-friendly error messages for edge cases

## Installation & Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Jubstaaa/bayzat-calculator.git
cd calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs at `http://localhost:5173`

## Testing

### Unit Tests (Jest)

```bash
# Run all unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### E2E Tests (Cypress)

```bash
# Run E2E tests in headless mode
npm run test:e2e

# Open Cypress GUI for interactive testing
npm run cy:open
```

**Note**: E2E tests verify the accuracy of calculations and ensure the application's reliability across different scenarios.

## Edge Cases Encountered & Solutions

### 1. JavaScript Floating-Point Precision Issues

**Problem**: `0.1 + 0.2` resulted in `0.30000000000000004` instead of `0.3`
**Solution**: Implemented rounding to 10 decimal places to avoid floating-point precision issues.

### 2. Division by Zero Handling

**Problem**: JavaScript throws `Infinity` for division by zero, which isn't user-friendly
**Solution**: Custom error handling with user-friendly "Division by zero is not allowed" message.

### 3. Large Number Display

**Problem**: Very large numbers could overflow UI or become unreadable
**Solution**: Added `wordBreak: 'break-all'` CSS property to ensure large results wrap properly and remain readable.

### 4. Trailing Operators

**Problem**: Expressions ending with operators like `3+` would cause evaluation errors
**Solution**: Pre-evaluation sanitization that removes trailing operators before parsing.

### 5. Multiple Decimal Points

**Problem**: Users could input invalid numbers like `1.2.3`
**Solution**: Input validation that prevents multiple decimal points within the same number.

### 6. Operator Precedence

**Problem**: JavaScript's default operator precedence might not match user expectations
**Solution**: JavaScript Function constructor automatically handles operator precedence correctly (multiplication/division before addition/subtraction).

## Testing Approach

### Unit Testing Strategy

- **Jest Framework**: Fast, reliable testing with excellent TypeScript support
- **Component Testing**: Isolated testing of Calculator component logic
- **Utility Testing**: Comprehensive testing of evaluation logic
- **Edge Case Coverage**: 50+ test cases covering all calculation scenarios

### E2E Testing Strategy

- **Cypress Framework**: Real browser testing for authentic user interactions
- **Calculation Accuracy**: Validates that all arithmetic operations produce correct results
- **UI Responsiveness**: Ensures calculator works across different screen sizes
- **Keyboard Support**: Tests full keyboard navigation and input handling
- **Error Scenarios**: Verifies proper error handling for edge cases

### Test Coverage Areas

- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Complex expressions with operator precedence
- ✅ Parentheses handling and nested expressions
- ✅ Error handling (division by zero, invalid expressions)
- ✅ UI interactions and keyboard support
- ✅ Responsive design across devices

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses **GitHub Actions** for automated testing, building, and deployment:

#### **Workflow Trigger**

- **Automatic**: On every push to `main` branch
- **Manual**: Can be triggered manually via GitHub Actions tab

#### **Pipeline Stages**

1. **🔄 Checkout & Setup**

   - Repository checkout
   - Node.js 20 setup with npm caching

2. **🧪 Testing Phase**

   - **Unit Tests**: Jest framework with TypeScript support
   - **E2E Tests**: Cypress for browser-based testing
   - **Development Server**: Auto-starts for E2E test environment

3. **🏗️ Build Phase**

   - TypeScript compilation (`tsc -b`)
   - Vite production build (`vite build`)
   - Output: `dist/` folder with optimized assets

4. **🚀 Deployment Phase**
   - **Vercel Deploy Hook**: Automatic deployment on successful build
   - **Environment**: Production deployment
   - **Branch**: `main` branch only

#### **Workflow File**

```yaml
.github/workflows/deploy.yml
```

#### **Deployment Process**

- Tests pass → Build succeeds → Auto-deploy to Vercel
- Failed tests prevent deployment (quality gate)
- Manual deployment available via GitHub Actions

#### **Benefits**

- ✅ **Automated Quality Control**: Tests run on every commit
- ✅ **Consistent Deployments**: Same process every time
- ✅ **Rollback Capability**: Vercel provides deployment history
- ✅ **Team Collaboration**: All team members can trigger deployments
- ✅ **Cost Effective**: No manual deployment overhead

## Code Quality & Maintainability

### TypeScript Implementation

- **Strict Mode**: Full TypeScript strict mode enabled for compile-time error catching
- **Static Typing**: Comprehensive type definitions for all calculator operations
- **Interface Design**: Clean interfaces for button definitions and state management
- **Error Handling**: Typed error handling with enum-based error messages

### React Best Practices

- **Functional Components**: Modern React with hooks (useState, useCallback, useMemo)
- **Performance Optimization**: Memoized calculations and event handlers
- **State Management**: Clean state management with proper separation of concerns
- **Component Structure**: Modular, reusable component architecture

### Code Organization

- **Separation of Concerns**: UI logic separated from calculation logic
- **Modular Architecture**: Clear separation between components, utilities, and tests
- **Consistent Naming**: Descriptive variable and function names
- **Documentation**: Comprehensive inline comments and JSDoc

## Tools & Libraries Used

### Core Technologies

- **TypeScript**: Chosen for static typing to catch calculation errors at compile time and improve code maintainability
- **React 19**: Latest React version for modern hooks and performance optimizations
- **Vite**: Fast build tool that provides excellent development experience with HMR

### UI Framework

- **Material-UI (MUI)**: Selected for consistent, accessible design system and responsive components that work across all devices
- **Emotion**: CSS-in-JS solution that MUI uses, providing better performance than styled-components

### Testing

- **Jest**: Unit testing framework with excellent TypeScript support
- **Cypress**: E2E testing for real browser validation of calculator functionality
- **eslint-plugin-cypress**: Enforces Cypress best practices and prevents anti-patterns

### Build & Development

- **ESLint**: Configured with TypeScript and React rules for code quality
- **ts-jest**: TypeScript support for Jest testing

## Deployment Instructions

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Build the project**:

   ```bash
   npm run build
   ```

3. **Deploy to Vercel**:

   ```bash
   vercel --prod
   ```

4. **Environment Variables**: No additional environment variables required

### Alternative: Netlify Deployment

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to Netlify dashboard

3. **Set build command**: `npm run build`
4. **Set publish directory**: `dist`

## Improvements If Had More Time

1. **Memory Functions**: Add M+, M-, MR, MC buttons for storing and recalling values
2. **Scientific Calculator**: Implement square root, power, percentage, and trigonometric functions
3. **History Persistence**: Save calculation history to localStorage for persistence across sessions
4. **Theme Switching**: Dark/light mode toggle for better user experience
5. **Accessibility**: Add ARIA labels, screen reader support, and keyboard navigation improvements
6. **Performance**: Implement virtual scrolling for very long calculation histories
7. **Internationalization**: Support for different number formats and locales
8. **Undo/Redo**: Add undo/redo functionality for calculation steps
9. **Export**: Allow users to export calculation history as CSV or PDF
10. **Mobile Optimization**: Touch-friendly interface improvements for mobile devices

## Project Structure

```
src/
├── components/
│   └── Calculator.tsx          # Main calculator component
├── lib/
│   └── evaluator.ts            # Simple calculator engine with enum-based error handling
├── __tests__/
│   └── evaluator.test.ts       # Unit tests for arithmetic logic
├── assets/                     # Static assets
└── main.tsx                    # Application entry point
```

## Contributing

This is a take-home assignment for Bayzat Frontend Test. For questions or clarifications, please contact the development team.

## License

This project is created for Bayzat Frontend Test assignment purposes.
