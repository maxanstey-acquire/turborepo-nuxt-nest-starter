import { oc } from '@orpc/contract';
import { z } from 'zod';
import { FEATURE_FLAG_KEYS } from '@app/shared/types/feature-flags';

const inputSchema = z.object({
  params: z.object({
    flag: z.enum(FEATURE_FLAG_KEYS),
  }),
});

const outputSchema = z.object({
  flag: z.enum(FEATURE_FLAG_KEYS),
  enabled: z.boolean(),
});

export const getById = oc
  .route({
    method: 'GET',
    path: '/{flag}',
    summary: 'Check whether a feature flag is enabled',
    inputStructure: 'detailed',
  })
  .input(inputSchema)
  .output(outputSchema);
