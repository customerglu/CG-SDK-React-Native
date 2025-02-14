# Contributing to CustomerGlu React Native SDK

We love your input! We want to make contributing to CustomerGlu React Native SDK as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. Set up your development environment:
   ```bash
   npm run setup
   ```
3. Make your changes.
4. Run tests and ensure they pass:
   ```bash
   npm test
   npm run test:migration
   cd example && npm run test:example
   ```
5. Update documentation if needed.
6. Issue that pull request!

## Development Environment Setup

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Xcode 15+ (for iOS)
- Android Studio (for Android)
- CocoaPods 1.12+ (for iOS)

### Setup Steps

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/CG-SDK-React-Native.git
cd CG-SDK-React-Native
```

2. Install dependencies:
```bash
npm run setup
```

3. Start the example app:
```bash
cd example
npm start

# In another terminal:
npm run android
# or
npm run ios
```

## Project Structure

```
CG-SDK-React-Native/
├── android/                # Native Android code
├── ios/                    # Native iOS code
├── src/                    # TypeScript/JavaScript code
│   ├── specs/             # UI component specs
│   ├── types/             # TypeScript definitions
│   └── __tests__/         # Tests
├── example/               # Example app
├── scripts/               # Development scripts
└── cpp/                   # C++ code for JSI
```

## Testing

We use Jest for testing. Run different test suites:

```bash
# Unit tests
npm test

# Migration tests
npm run test:migration

# Example app tests
cd example && npm run test:example

# Verify migration
npm run verify:migration
```

### Writing Tests

- Place tests in `__tests__` directories
- Name test files with `.test.ts` or `.test.tsx` extension
- Use descriptive test names
- Test both success and failure cases
- Mock external dependencies

Example:
```typescript
describe('CustomerGlu Module', () => {
  it('should initialize SDK', async () => {
    const result = await initCGSDK('development');
    expect(result).toBe(true);
  });
});
```

## Native Code Changes

### Android

1. Open `android/` in Android Studio
2. Make changes in Java/Kotlin files
3. Run codegen:
   ```bash
   npm run codegen
   ```
4. Test in example app:
   ```bash
   cd example && npm run android
   ```

### iOS

1. Open `ios/Rncustomerglu.xcodeproj` in Xcode
2. Make changes in Swift/Objective-C files
3. Run codegen:
   ```bash
   npm run codegen
   ```
4. Install pods and test:
   ```bash
   cd example/ios && pod install
   cd .. && npm run ios
   ```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the MIGRATION.md if you're changing architecture-related code
3. Update example app if needed
4. Run all tests and ensure they pass
5. Update documentation for any changed functionality
6. The PR will be merged once you have the sign-off of maintainers

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/customerglu/CG-SDK-React-Native/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/customerglu/CG-SDK-React-Native/issues/new).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/master/CONTRIBUTING.md).
