import { oc } from '@orpc/contract';
import { z } from 'zod';
import { userSchema } from '@schemas/user';

const outputSchema = z.object({
  user: userSchema,
});

export const me = oc
  .route({
    method: 'GET',
    path: '/me',
    summary: 'Fetch the authenticated user',
  })
  .output(outputSchema);
