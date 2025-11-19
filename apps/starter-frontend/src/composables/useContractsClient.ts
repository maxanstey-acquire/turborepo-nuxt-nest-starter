import { makeClient } from '@speechscribe/contracts/client';

export const useContractsClient = () => {
  const config = useRuntimeConfig();

  if (!config.public.apiUrl) {
    throw new Error('Missing API URL (public.apiUrl)');
  }

  return makeClient({
    baseUrl: config.public.apiUrl,
    credentials: 'include',
  });
};
