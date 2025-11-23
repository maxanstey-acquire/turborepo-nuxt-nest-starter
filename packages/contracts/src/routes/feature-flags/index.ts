import {getById} from './get-by-id';
import {oc} from "@orpc/contract";

export const featureFlags = oc.prefix('/feature-flags').router({
    getById,
});
