import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asset-manager',
  imports: [FaIconComponent],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetManagerComponent {
  // #region Dependencies
  readonly modalService = inject(NgbModal);
  // #endregion

  constructor(library: FaIconLibrary) {
    library.addIcons(faHandHoldingDollar);
  }

  whenAddAssetsButtonClicked() {
    this.modalService.open(AddAssetModalComponent, { scrollable: true });
  }
}
