import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';

@Component({
  selector: 'app-asset-manager',
  imports: [AddAssetModalComponent],
  templateUrl: './asset-manager.component.html',
  styleUrl: './asset-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetManagerComponent {
  readonly showModal = signal(false);
}
