import { z } from 'zod';
import { userSchema } from '../schemas/user';
import type { User } from '@app/shared/types/user';

export type MeResponse = {
  user: User;
};

export const meResponseSchema: z.ZodType<MeResponse> = z.object({
  user: userSchema,
});
