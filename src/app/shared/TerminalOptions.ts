import {ITerminalInitOnlyOptions, ITerminalOptions} from '@xterm/xterm';

export const defaultOptions: ITerminalOptions | ITerminalInitOnlyOptions = {
  cursorBlink: true,
  cursorStyle: 'underline',
  cursorInactiveStyle: 'underline',
  fastScrollModifier: 'alt',
  fastScrollSensitivity: 10,
  allowProposedApi: true,
  rightClickSelectsWord: true,
  screenReaderMode: true,
  disableStdin: false,
  windowsPty: {
    backend: 'winpty',
  },
};
