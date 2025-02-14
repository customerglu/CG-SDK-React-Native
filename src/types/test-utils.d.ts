declare module '@testing-library/react-native' {
  import { ReactElement } from 'react';
  import { ReactTestInstance } from 'react-test-renderer';

  export interface RenderResult {
    container: ReactTestInstance;
    getByTestId(testId: string): ReactTestInstance;
    getByText(text: string | RegExp): ReactTestInstance;
    queryByTestId(testId: string): ReactTestInstance | null;
    queryByText(text: string | RegExp): ReactTestInstance | null;
    getAllByTestId(testId: string): ReactTestInstance[];
    getAllByText(text: string | RegExp): ReactTestInstance[];
    rerender(ui: ReactElement): void;
    unmount(): void;
    debug(message?: string): void;
  }

  export interface RenderOptions {
    wrapper?: React.ComponentType<any>;
    createNodeMock?: (element: ReactElement) => any;
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export function act(
    callback: () => Promise<void> | void
  ): Promise<void> | void;

  export function cleanup(): void;

  export function fireEvent(
    element: ReactTestInstance | null,
    eventName: string,
    ...data: any[]
  ): void;

  export const within: (
    instance: ReactTestInstance
  ) => Omit<RenderResult, 'container' | 'rerender' | 'unmount'>;
}
