import { oc } from '@orpc/contract';
import {auth} from "./routes/auth";
import {subscriptions} from "./routes/subscriptions";
import {featureFlags} from "./routes/feature-flags";

export const contract = oc
  .prefix('/api')
  .router({
    auth,
    featureFlags,
    subscriptions,
  });
