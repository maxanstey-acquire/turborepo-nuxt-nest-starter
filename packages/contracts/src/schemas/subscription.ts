import { z } from 'zod';
import type { Subscription } from '@app/shared/types/subscription';

export const subscriptionSchema: z.ZodType<Subscription> = z.object({
  id: z.string(),
  status: z.enum(['active', 'expired']),
  expiresAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
