import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { Asset } from '../models/asset';

export const AssetStore = signalStore(
  withEntities<Asset>(),
  withComputed(({ entities }) => ({
    totalValue: computed(() =>
      entities().reduce((acc, asset) => acc + asset.value, 0)
    ),
  })),
  withMethods((store) => ({
    addAsset(asset: Asset): void {
      patchState(store, addEntity(asset));
    },
    removeAsset(asset: Asset): void {
      patchState(store, removeEntity(asset.id));
    },
  }))
);
