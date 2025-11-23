import { oc } from '@orpc/contract';
import { getById } from './get-by-id';

export const subscriptions = oc.prefix('/subscriptions').router({
  getById,
});
