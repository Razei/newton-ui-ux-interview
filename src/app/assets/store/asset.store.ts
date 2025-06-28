import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  upsertEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { generateUUID } from '../../utils/id.utils';
import { Nullable } from '../../utils/typescript.utils';
import { Asset } from '../models/asset';

export const AssetStore = signalStore(
  withEntities<Asset>(),
  withComputed(({ entities }) => ({
    totalValue: computed(() =>
      entities().reduce((acc, asset) => acc + (asset.value ?? 0), 0)
    ),
  })),
  withMethods((store) => ({
    addAsset(asset: Asset): void {
      patchState(store, addEntity(asset));
    },
    upsertAssets(
      assets: (Omit<Asset, 'id'> & { id: Nullable<string> })[]
    ): void {
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
