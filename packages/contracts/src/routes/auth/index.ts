import { oc } from '@orpc/contract';
import { me } from './me';

export const auth = oc.prefix('/auth').router({
  me,
});
