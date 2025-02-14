declare module 'react-native' {
  import type { TurboModule as BaseTurboModule } from 'react-native/Libraries/TurboModule/RCTExport';

  export interface TurboModule extends BaseTurboModule {
    readonly getConstants?: () => Record<string, unknown>;
  }

  export interface TurboModuleRegistry {
    getEnforcing<T extends TurboModule>(name: string): T;
    get<T extends TurboModule>(name: string): T | null;
  }

  export const TurboModuleRegistry: TurboModuleRegistry;

  export interface ViewProps {
    style?: any;
    testID?: string;
    nativeID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
    accessibilityState?: Record<string, any>;
    onLayout?: (event: {
      nativeEvent: {
        layout: { x: number; y: number; width: number; height: number };
      };
    }) => void;
  }

  export type HostComponent<P> = {
    new (props: P): any;
  };

  export const Platform: {
    OS: 'ios' | 'android' | 'web';
    Version: number | string;
    select: <T extends Record<string, any>>(obj: T) => T[keyof T];
    isPad: boolean;
    isTV: boolean;
    isTesting: boolean;
  };
}

declare module 'react-native/Libraries/TurboModule/RCTExport' {
  export interface TurboModule {
    readonly getConstants?: () => Record<string, unknown>;
  }
}
