import {getById} from './get-by-id';
import {oc} from "@orpc/contract";

export const subscriptions = oc.prefix('/subscriptions').router({
    getById,
});
