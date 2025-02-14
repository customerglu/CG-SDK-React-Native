# CustomerGlu React Native SDK

React Native SDK for CustomerGlu with New Architecture (Fabric & TurboModules) support.

## Quick Start

### Installation

```bash
npm install @customerglu/react-native-customerglu
```

### Setup Development Environment

1. Clone the repository:
```bash
git clone https://github.com/customerglu/CG-SDK-React-Native.git
cd CG-SDK-React-Native
```

2. Run setup script:
```bash
npm run setup
```

This will:
- Install dependencies
- Generate native code
- Build the project
- Run tests
- Set up the example app

### Running Example App

```bash
cd example
npm start

# In another terminal:
npm run android
# or
npm run ios
```

## Usage

```typescript
import {
  initCGSDK,
  registerDevice,
  BannerWidget,
  EmbedBannerWidget,
} from '@customerglu/react-native-customerglu';

// Initialize SDK
await initCGSDK('development');

// Register user
const result = await registerDevice({
  userId: 'user123',
  userAttributes: {
    email: 'user@example.com',
  },
});

// Use UI components
function MyComponent() {
  return (
    <>
      <BannerWidget
        bannerId="your-banner-id"
        style={{ width: '100%', height: 200 }}
      />
      <EmbedBannerWidget
        bannerId="your-embed-id"
        style={{ width: '100%', height: 300 }}
      />
    </>
  );
}
```

## Development Scripts

- `npm run codegen` - Generate native code
- `npm run build` - Build the SDK
- `npm test` - Run tests
- `npm run test:migration` - Test new architecture migration
- `npm run verify:migration` - Verify migration status
- `npm run clean` - Clean build files
- `npm run setup` - Setup development environment

## Example App Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run test:example` - Run example app tests
- `npm run clean` - Clean build files
- `npm run rebuild` - Clean and rebuild

## New Architecture Support

This SDK supports React Native's New Architecture with:
- TurboModules for native modules
- Fabric for UI components
- JSI for direct native communication
- Codegen for type-safe interfaces

See [MIGRATION.md](./MIGRATION.md) for migration details.

## Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:migration
cd example && npm run test:example

# Verify migration
npm run verify:migration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- [GitHub Issues](https://github.com/customerglu/CG-SDK-React-Native/issues)
- Email: code@customerglu.net
- [Discord Community](https://discord.gg/customerglu)
