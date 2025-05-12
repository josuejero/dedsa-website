import { gql } from '@apollo/client';

export const GET_UI_STRING = gql`
  query GetUiString($key: String!) {
    uiStringByKey(key: $key) {
      stringData {
        stringKey
        stringValue
      }
    }
  }
`;

export const GET_UI_STRINGS_BY_COMPONENT = gql`
  query GetUiStringsByComponent($componentId: String!) {
    uiStringsByComponent(componentId: $componentId) {
      stringData {
        stringKey
        stringValue
      }
    }
  }
`;
