import { gql } from '@apollo/client';

export const GET_UI_STRING = gql`
  query GetUIString($key: String!) {
    uiStringByKey(key: $key) {
      stringData {
        stringKey
        stringValue
      }
    }
  }
`;

export const GET_UI_STRINGS_BY_COMPONENT = gql`
  query GetUIStringsByComponent($componentId: String!) {
    uiStringsByComponent(componentId: $componentId) {
      stringData {
        stringKey
        stringValue
      }
    }
  }
`;
