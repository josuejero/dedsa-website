'use client';

import { useUiString } from '../../hooks/content/useUiString';

export interface UiStringProps {
  id: string;
  fallback: string;
}

export default function UiString({ id, fallback }: UiStringProps) {
  const text = useUiString(id, fallback);
  return <>{text}</>;
}
