import { z } from 'zod';
import type { User } from '@app/shared/types/user';

export const userSchema: z.ZodType<User> = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatarUrl: z.string().url().nullable().optional(),
});
