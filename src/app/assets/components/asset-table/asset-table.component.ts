import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { triggerDeleteAnimation } from '../../../utils/animation.utils';
import { CurrencyMaskDirective } from '../../directives/currenct-mask/currency-mask.directive';
import { AssetStore } from '../../store/asset.store';
import { createNewAssetFormGroup } from '../../utils/asset.utils';
import {
  AssetFormArray,
  AssetFormGroup,
} from '../add-asset-modal/add-asset-modal.component';
@Component({
  selector: 'app-asset-table',
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    NgClass,
    CurrencyMaskDirective,
  ],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetTableComponent {
  // #region Dependencies
  readonly assetStore = inject(AssetStore);
  private readonly cdRef = inject(ChangeDetectorRef);
  // #endregion

  // #region Input
  readonly assetFormGroup = input.required<FormGroup<AssetFormArray>>();
  // #endregion

  // #region Reactive properties
  readonly tableColumns = signal(['Type', 'Value', '']);
  readonly assetFormArray = computed(
    () => this.assetFormGroup()?.get('assets') as FormArray<AssetFormGroup>
  );
  readonly isDeleteInProgress = signal(false);
  // #endregion

  constructor(library: FaIconLibrary) {
    library.addIcons(faCirclePlus, faTrashCan);
  }

  addEmptyAsset() {
    this.assetFormArray()?.push(createNewAssetFormGroup());
  }

  deleteAsset(index: number, rowElement: HTMLTableRowElement) {
    if (this.isDeleteInProgress()) {
      return;
    }

    this.isDeleteInProgress.set(true);

    triggerDeleteAnimation(rowElement, 'delete-container', () => {
      // prevent deleting last item
      if (this.assetFormArray().length > 1) {
        this.assetFormArray()?.removeAt(index);
        this.isDeleteInProgress.set(false);
        this.cdRef.markForCheck();
      }
    });
  }
}
