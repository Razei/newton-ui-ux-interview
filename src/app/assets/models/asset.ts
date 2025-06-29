import { Nullable } from '../../utils/typescript/typescript.utils';

export type Asset = {
  id: string;
  type: string;
  value: Nullable<string>;
};

export type AssetUpsert = Omit<Asset, 'id'> & {
  id?: Nullable<string>;
};
