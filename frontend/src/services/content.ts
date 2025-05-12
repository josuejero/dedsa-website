import { getClient } from '../lib/apollo-client';
import {
  GET_GLOBAL_CONTENT,
  GET_HOME_CONTENT,
} from '../lib/graphql/queries/content/global';
import {
  GET_UI_STRING,
  GET_UI_STRINGS_BY_COMPONENT,
} from '../lib/graphql/queries/content/strings';

// Default values for fallbacks
const DEFAULT_GLOBAL_CONTENT = {
  siteName: 'Delaware DSA',
  tagline: 'Democratic Socialists of America',
  joinButtonText: 'Join Our Chapter',
  contactInfo: {
    email: 'info@delawardsa.org',
    phone: '(302) 555-0123',
    mailingAddress: 'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
  },
  socialLinks: {
    twitter: 'https://twitter.com/delawaredsa',
    facebook: 'https://facebook.com/delawaredsa',
    instagram: 'https://instagram.com/delawaredsa',
  },
};

// Get global content - server side
export async function getGlobalContent() {
  try {
    const { data } = await getClient().query({
      query: GET_GLOBAL_CONTENT,
    });

    return data?.acfOptions?.globalContent || DEFAULT_GLOBAL_CONTENT;
  } catch (error) {
    console.error('Error fetching global content:', error);
    return DEFAULT_GLOBAL_CONTENT;
  }
}

// Get home page content - server side
export async function getHomeContent() {
  try {
    const { data } = await getClient().query({
      query: GET_HOME_CONTENT,
    });

    return data?.acfOptions?.homeContent || {};
  } catch (error) {
    console.error('Error fetching home content:', error);
    return {};
  }
}

// Get UI string - server side
export async function getUiString(key: string, fallback: string = '') {
  try {
    const { data } = await getClient().query({
      query: GET_UI_STRING,
      variables: { key },
    });

    return data?.uiStringByKey?.stringData?.stringValue || fallback;
  } catch (error) {
    console.error(`Error fetching UI string "${key}":`, error);
    return fallback;
  }
}

// Get UI strings by component - server side
export async function getUiStringsByComponent(componentId: string) {
  try {
    const { data } = await getClient().query({
      query: GET_UI_STRINGS_BY_COMPONENT,
      variables: { componentId },
    });

    const strings: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.uiStringsByComponent?.forEach((item: any) => {
      const { stringKey, stringValue } = item.stringData;
      strings[stringKey] = stringValue;
    });

    return strings;
  } catch (error) {
    console.error(
      `Error fetching UI strings for component "${componentId}":`,
      error
    );
    return {};
  }
}
