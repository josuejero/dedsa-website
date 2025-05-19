'use client';

import { useEffect, useState } from 'react';

export function useUiString(id: string, fallback: string): string {
  const [text, setText] = useState<string>(fallback);

  useEffect(() => {
    // In a real app, this would fetch the string from an API or context
    // For now, we just return the fallback
    setText(fallback);
  }, [id, fallback]);

  return text;
}
