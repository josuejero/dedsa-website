'use client';

import { useQuery } from '@apollo/client';
import {
  GET_UI_STRING,
  GET_UI_STRINGS_BY_COMPONENT,
} from '../../lib/graphql/queries/content/strings';

// Check if Apollo is being skipped
const isApolloSkipped = process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR === 'true';

// Hook to get a single UI string
export function useUiString(key: string, fallback: string = '') {
  // Call useQuery unconditionally, but with skip option if needed
  const { data, loading, error } = useQuery(GET_UI_STRING, {
    variables: { key },
    skip: isApolloSkipped,
  });

  // Return fallback in various conditions
  if (isApolloSkipped || loading || error) {
    return fallback;
  }

  return data?.uiStringByKey?.stringData?.stringValue || fallback;
}

// Hook to get all strings for a component
export function useUiStringsByComponent(componentId: string) {
  // Call useQuery unconditionally with skip option when needed
  const { data, loading, error } = useQuery(GET_UI_STRINGS_BY_COMPONENT, {
    variables: { componentId },
    skip: isApolloSkipped,
  });

  // Return empty object in various conditions
  if (isApolloSkipped || loading || error) {
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
