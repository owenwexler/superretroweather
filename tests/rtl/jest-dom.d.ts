import type matchers from '@testing-library/jest-dom/matchers';

declare module 'bun:test' {
  interface Matchers<T> extends matchers.TestingLibraryMatchers<T, void> {}
}
