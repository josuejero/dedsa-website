'use client';

import { useQuery } from '@apollo/client';
import {
  GET_UI_STRING,
  GET_UI_STRINGS_BY_COMPONENT,
} from '../../lib/graphql/queries/content/strings';

// Hook to get a single UI string
export function useUiString(key: string, fallback: string = '') {
  const { data, loading, error } = useQuery(GET_UI_STRING, {
    variables: { key },
  });

  if (loading || error) {
    return fallback;
  }

  return data?.uiStringByKey?.stringData?.stringValue || fallback;
}

// Hook to get all strings for a component
export function useUiStringsByComponent(componentId: string) {
  const { data, loading, error } = useQuery(GET_UI_STRINGS_BY_COMPONENT, {
    variables: { componentId },
  });

  if (loading || error) {
    return {};
  }

  const strings: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?.uiStringsByComponent?.forEach((item: any) => {
    const { stringKey, stringValue } = item.stringData;
    strings[stringKey] = stringValue;
  });

  return strings;
}
