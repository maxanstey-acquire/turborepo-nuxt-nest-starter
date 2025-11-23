import { oc } from '@orpc/contract';
import { auth } from './routes/auth';
import { featureFlags } from './routes/feature-flags';
import { subscriptions } from './routes/subscriptions';

export const contract = oc.prefix('/api').router({
  auth,
  featureFlags,
  subscriptions,
});
