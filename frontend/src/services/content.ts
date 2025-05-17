import { fetchGraphQL } from '../utils/graphql/fetcher';

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

interface GlobalContent {
  globalContent?: typeof DEFAULT_GLOBAL_CONTENT;
}

interface HomeContent {
  homeContent?: Record<string, unknown>;
}

interface UiString {
  uiStringByKey?: {
    stringData?: {
      stringValue?: string;
    };
  };
}

interface UiStringsByComponent {
  uiStringsByComponent?: Array<{
    stringData: {
      stringKey: string;
      stringValue: string;
    };
  }>;
}

// Get global content - server side
export async function getGlobalContent() {
  try {
    const query = `
      query GetGlobalContent {
        acfOptions {
          globalContent {
            siteName
            tagline
            joinButtonText
            contactInfo {
              email
              phone
              mailingAddress
            }
            socialLinks {
              twitter
              facebook
              instagram
            }
          }
        }
      }
    `;

    const response = await fetchGraphQL<{ acfOptions: GlobalContent }>(query);
    return response.data?.acfOptions?.globalContent || DEFAULT_GLOBAL_CONTENT;
  } catch (error) {
    console.error('Error fetching global content:', error);
    return DEFAULT_GLOBAL_CONTENT;
  }
}

// Get home page content - server side
export async function getHomeContent() {
  try {
    const query = `
      query GetHomeContent {
        acfOptions {
          homeContent
        }
      }
    `;

    const response = await fetchGraphQL<{ acfOptions: HomeContent }>(query);
    return response.data?.acfOptions?.homeContent || {};
  } catch (error) {
    console.error('Error fetching home content:', error);
    return {};
  }
}

// Get UI string - server side
export async function getUiString(key: string, fallback: string = '') {
  try {
    const query = `
      query GetUiString($key: String!) {
        uiStringByKey(key: $key) {
          stringData {
            stringValue
          }
        }
      }
    `;

    const response = await fetchGraphQL<UiString>(query, { key });
    return response.data?.uiStringByKey?.stringData?.stringValue || fallback;
  } catch (error) {
    console.error(`Error fetching UI string "${key}":`, error);
    return fallback;
  }
}

// Get UI strings by component - server side
export async function getUiStringsByComponent(componentId: string) {
  try {
    const query = `
      query GetUiStringsByComponent($componentId: String!) {
        uiStringsByComponent(componentId: $componentId) {
          stringData {
            stringKey
            stringValue
          }
        }
      }
    `;

    const response = await fetchGraphQL<UiStringsByComponent>(query, {
      componentId,
    });

    const strings: Record<string, string> = {};
    response.data?.uiStringsByComponent?.forEach((item) => {
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
