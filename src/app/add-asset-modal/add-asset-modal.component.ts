import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetStore } from '../assets/asset.store';

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

  readonly name = input('World');
}
