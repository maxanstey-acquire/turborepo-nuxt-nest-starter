import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { contract } from './contract';
import type { ContractRouterClient } from '@orpc/contract';

export type ClientConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
};

export const makeClient = (
  config: ClientConfig,
): ContractRouterClient<typeof contract> =>
  createORPCClient(
    new OpenAPILink(contract, {
      url: () => config.baseUrl,
      headers: () => ({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...config.headers,
      }),
    }),
  );
