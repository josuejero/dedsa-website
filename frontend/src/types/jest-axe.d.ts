declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';
  import { MatcherFunction } from 'expect';

  export function axe(html: any, options?: any): Promise<AxeResults>;
  export const toHaveNoViolations: MatcherFunction<[AxeResults?]>;
}
