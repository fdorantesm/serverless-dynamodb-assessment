import type { Json } from '@/types/json.type';
import { omit } from 'lodash';

export function removeKeys(object: Json, keys: string[]): Json {
  return omit(object, keys);
}
