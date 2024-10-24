export const isWindows = (): boolean =>
  window.navigator.userAgent.includes('Win');

export const getPathSeparator = (): string => (isWindows() ? '\\' : '/');

export const newLine = (): string => (isWindows() ? '\r\n' : '\n');
