import { oc } from '@orpc/contract';
import { z } from 'zod';
import { subscriptionSchema } from '@schemas/subscription';

const inputSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const outputSchema = z.object({
  subscription: subscriptionSchema.nullable(),
});

export const getById = oc
  .route({
    method: 'GET',
    path: '/{id}',
    summary: 'Get a subscription',
    inputStructure: 'detailed',
  })
  .input(inputSchema)
  .output(outputSchema);
