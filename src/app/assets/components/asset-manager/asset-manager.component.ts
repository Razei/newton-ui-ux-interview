import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
} from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetStore } from '../../store/asset.store';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';

@Component({
  selector: 'app-asset-manager',
  imports: [FaIconComponent, CurrencyPipe],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AssetStore],
})
export class AssetManagerComponent {
  // #region Dependencies
  readonly modalService = inject(NgbModal);
  readonly injector = inject(Injector);
  readonly assetStore = inject(AssetStore);
  // #endregion

  constructor(library: FaIconLibrary) {
    library.addIcons(faHandHoldingDollar);
  }

  whenAddAssetsButtonClicked() {
    this.modalService.open(AddAssetModalComponent, {
      scrollable: true,
      injector: this.injector,
    });
  }

  deleteAsset(assetId: string) {
    this.assetStore.removeAsset(assetId);
  }
}
