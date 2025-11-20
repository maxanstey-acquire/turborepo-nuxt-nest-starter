import { oc } from '@orpc/contract';
import { z } from 'zod';
import { meResponseSchema } from './responses/me';
import { FEATURE_FLAG_KEYS } from '@app/shared/types/feature-flags';

const featureFlagParamsSchema = z.object({
  params: z.object({
    flag: z.enum(FEATURE_FLAG_KEYS),
  }),
});

const featureFlagResponseSchema = z.object({
  flag: z.enum(FEATURE_FLAG_KEYS),
  enabled: z.boolean(),
});

export const contract = oc
  .prefix('/api')
  .router({
    auth: oc
      .prefix('/auth')
      .router({
        me: oc
          .route({
            method: 'GET',
            path: '/me',
            summary: 'Fetch the authenticated user',
          })
          .output(meResponseSchema),
      }),
    featureFlags: oc
      .prefix('/feature-flags')
      .router({
        get: oc
          .route({
            method: 'GET',
            path: '/{flag}',
            summary: 'Check whether a feature flag is enabled',
            inputStructure: 'detailed',
          })
          .input(featureFlagParamsSchema)
          .output(featureFlagResponseSchema),
      }),
  });
