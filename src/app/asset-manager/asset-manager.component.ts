import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-asset-manager',
  imports: [AddAssetModalComponent, FaIconComponent],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetManagerComponent {
  readonly showModal = signal(false);

  constructor(library: FaIconLibrary) {
    library.addIcons(faHandHoldingDollar);
  }
}
