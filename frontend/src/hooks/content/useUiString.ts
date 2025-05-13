'use client';

import { useQuery } from '@apollo/client';
import {
  GET_UI_STRING,
  GET_UI_STRINGS_BY_COMPONENT,
} from '../../lib/graphql/queries/content/strings';

/** Shape of the single‐string query response */
// interface UiStringQueryData {
//   uiStringByKey?: {
//     stringData?: {
//       stringValue?: string;
//     };
//   };
// }
// /** Variables for the single‐string query */
// interface UiStringQueryVars {
//   key: string;
// }

/** Shape of the multi‐string query response */
interface UiStringsByComponentQueryData {
  uiStringsByComponent: Array<{
    stringData: {
      stringKey: string;
      stringValue: string;
    };
  }>;
}
/** Variables for the multi‐string query */
interface UiStringsByComponentQueryVars {
  componentId: string;
}

// Honor the SKIP flag in environment
const isApolloSkipped = process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR === 'true';

/**
 * Fetch a single UI string by key.
 * Returns `fallback` if SSR is skipped, loading, or on error.
 */
export function useUiString(key: string, fallback = ''): string {
  const { data, loading, error } = useQuery(GET_UI_STRING, {
    variables: { key },
  });

  if (loading || error) {
    return fallback;
  }

  return data?.uiStringByKey?.stringData?.stringValue ?? fallback;
}

/**
 * Fetch all UI strings for a component, returning a key→value map.
 * Returns empty object if SSR is skipped, loading, or on error.
 */
export function useUiStringsByComponent(
  componentId: string
): Record<string, string> {
  const { data, loading, error } = useQuery<
    UiStringsByComponentQueryData,
    UiStringsByComponentQueryVars
  >(GET_UI_STRINGS_BY_COMPONENT, {
    variables: { componentId },
    skip: isApolloSkipped,
  });

  if (isApolloSkipped || loading || error || !data) {
    return {};
  }

  return data.uiStringsByComponent.reduce<Record<string, string>>(
    (acc, { stringData }) => {
      acc[stringData.stringKey] = stringData.stringValue;
      return acc;
    },
    {}
  );
}
