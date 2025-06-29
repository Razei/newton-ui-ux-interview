import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  upsertEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { generateUUID } from '../../utils/id/id.utils';
import { Asset, AssetUpsert } from '../models/asset';

export const AssetStore = signalStore(
  withState({
    assetTypes: ['Gift', 'Savings', 'RRSP', 'Other'],
  }),
  withEntities<Asset>(),
  withComputed(({ entities }) => ({
    totalValue: computed(() =>
      entities().reduce((acc, asset) => acc + (Number(asset.value) ?? 0), 0)
    ),
  })),
  withMethods((store) => ({
    addAsset(asset: Asset): void {
      patchState(store, addEntity(asset));
    },
    upsertAssets(assets: AssetUpsert[]): void {
      patchState(
        store,
        upsertEntities(
          assets.map((asset) => ({ ...asset, id: asset.id ?? generateUUID() }))
        )
      );
    },
    removeAsset(assetId: string): void {
      patchState(store, removeEntity(assetId));
    },
  }))
);
