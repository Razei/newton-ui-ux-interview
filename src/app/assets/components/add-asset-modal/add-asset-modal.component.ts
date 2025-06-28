import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetStore } from '../../store/asset.store';

@Component({
  selector: 'app-add-asset-modal',
  imports: [FaIconComponent],
  templateUrl: './add-asset-modal.component.html',
  styleUrl: './add-asset-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAssetModalComponent {
  readonly activeModal = inject(NgbActiveModal);
  readonly assetStore = inject(AssetStore);

  constructor(library: FaIconLibrary) {
    library.addIcons(faHandHoldingDollar);
  }
}
