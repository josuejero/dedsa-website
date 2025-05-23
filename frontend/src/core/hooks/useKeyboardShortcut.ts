import { useCallback, useEffect } from 'react';

import { KeyMap, ShortcutOptions } from '@/core/types/hooks';

export function useKeyboardShortcut(
  keyMap: KeyMap,
  options: ShortcutOptions = {}
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { ctrlKey, altKey, shiftKey, metaKey } = options;

      if (
        (ctrlKey && !event.ctrlKey) ||
        (altKey && !event.altKey) ||
        (shiftKey && !event.shiftKey) ||
        (metaKey && !event.metaKey)
      ) {
        return;
      }

      const handler = keyMap[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    },
    [keyMap, options]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}
