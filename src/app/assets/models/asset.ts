import { Nullable } from '../../utils/typescript.utils';

export type Asset = {
  id: string;
  type: string;
  value: Nullable<number>;
};

export type AssetUpsert = Omit<Asset, 'id'> & {
  id?: Nullable<string>;
};
