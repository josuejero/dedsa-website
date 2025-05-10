'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const createUrlWithParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  };

  const navigateWithParams = (newParams: Record<string, string>) => {
    router.push(createUrlWithParams(newParams));
  };

  return {
    router,
    pathname,
    searchParams,
    getQueryParams,
    createUrlWithParams,
    navigateWithParams
  };
}
