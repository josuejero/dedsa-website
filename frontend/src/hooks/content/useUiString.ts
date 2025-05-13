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
  // If Apollo is skipped, just return the fallback value
  if (isApolloSkipped) {
    return fallback;
  }

  // Otherwise, use the original implementation
  try {
    const { data, loading, error } = useQuery(GET_UI_STRING, {
      variables: { key },
    });

    if (loading || error) {
      return fallback;
    }

    return data?.uiStringByKey?.stringData?.stringValue || fallback;
  } catch (e) {
    console.error(`Error in useUiString for key ${key}:`, e);
    return fallback;
  }
}

// Hook to get all strings for a component
export function useUiStringsByComponent(componentId: string) {
  // If Apollo is skipped, just return an empty object
  if (isApolloSkipped) {
    return {};
  }

  try {
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
  } catch (e) {
    console.error(
      `Error in useUiStringsByComponent for componentId ${componentId}:`,
      e
    );
    return {};
  }
}
