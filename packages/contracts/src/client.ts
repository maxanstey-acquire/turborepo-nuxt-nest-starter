import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import type { ContractRouterClient } from '@orpc/contract';
import { contract } from './contract';

export type ClientConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
};

// TODO: Document this explicit type annotation is necessary for
//       client-side resolution.
export type ContractsClient = ContractRouterClient<typeof contract>;

export const makeClient = (config: ClientConfig): ContractsClient => {
  const link = new OpenAPILink(contract, {
    url: () => config.baseUrl,
    headers: () => ({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    }),
  });

  return createORPCClient<ContractsClient>(link);
};
