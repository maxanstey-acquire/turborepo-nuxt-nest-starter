import { z } from 'zod';
import { userSchema } from '../schemas/user';
import type { User } from '@speechscribe/shared';

export type MeResponse = {
  user: User;
};

// TODO: Document that explicit typing = MeResponse/User type is exported
//       e.g. cmd click await client.auth.me and you'll see
export const meResponseSchema: z.ZodType<MeResponse> = z.object({
  user: userSchema,
});
