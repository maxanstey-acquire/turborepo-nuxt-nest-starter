import { oc } from '@orpc/contract';
import { getById } from './get-by-id';

export const featureFlags = oc.prefix('/feature-flags').router({
  getById,
});
