import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Nullable } from '../../../utils/typescript.utils';
import { AssetStore } from '../../store/asset.store';
import { createNewAssetFormGroup } from '../../utils/asset.utils';
import { AssetTableComponent } from '../asset-table/asset-table.component';

@Component({
  selector: 'app-add-asset-modal',
  imports: [FaIconComponent, AssetTableComponent, ReactiveFormsModule],
  templateUrl: './add-asset-modal.component.html',
  styleUrl: './add-asset-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAssetModalComponent {
  // #region Dependencies
  readonly activeModal = inject(NgbActiveModal);
  readonly assetStore = inject(AssetStore);
  // #endregion

  readonly assetForm = new FormGroup<AssetFormArray>(
    {
      assets: new FormArray<AssetFormGroup>([createNewAssetFormGroup()]),
    },
    { updateOn: 'submit' }
  );

  constructor(library: FaIconLibrary) {
    library.addIcons(faHandHoldingDollar);
  }

  get assetFormArray() {
    return this.assetForm.get('assets') as FormArray<AssetFormGroup>;
  }

  saveAssets() {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    const value = this.assetForm.getRawValue();

    this.assetStore.upsertAssets(value.assets);

    this.activeModal.close('Close click');
  }
}

export type AssetFormArray = {
  assets: FormArray<AssetFormGroup>;
};

export type AssetFormGroup = FormGroup<AssetControls>;

export type AssetControls = {
  /**
   * Since these are FE only assets, we can use a generated UUID as the ID.
   */
  id: FormControl<Nullable<string>>;
  type: FormControl<string>;
  value: FormControl<number | null>;
};
