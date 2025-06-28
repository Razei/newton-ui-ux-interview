import { Nullable } from '../../utils/typescript.utils';

export type Asset = {
  id: string;
  type: string;
  value: Nullable<number>;
};
