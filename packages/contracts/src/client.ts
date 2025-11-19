import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { contract } from './contract';

export type ClientConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
};

export const makeClient = (config: ClientConfig) => {
  const link = new OpenAPILink(contract, {
    url: () => config.baseUrl,
    headers: () => ({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    }),
  });

  return createORPCClient(link);
};
