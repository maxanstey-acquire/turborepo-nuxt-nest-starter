import {me} from './me';
import {oc} from "@orpc/contract";

export const auth = oc.prefix('/auth').router({
    me,
});
