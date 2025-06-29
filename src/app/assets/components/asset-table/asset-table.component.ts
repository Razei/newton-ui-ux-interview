import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CurrencyMaskDirective } from '../../directives/currency-mask.directive';
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
  // #endregion

  readonly tableColumns = signal(['Type', 'Value', '']);
  readonly assetFormGroup = input.required<FormGroup<AssetFormArray>>();
  readonly assetFormArray = computed(
    () => this.assetFormGroup()?.get('assets') as FormArray<AssetFormGroup>
  );

  constructor(library: FaIconLibrary) {
    library.addIcons(faCirclePlus, faTrashCan);
  }

  addEmptyAsset() {
    this.assetFormArray()?.push(createNewAssetFormGroup());
  }

  deleteAsset(index: number) {
    this.assetFormArray()?.removeAt(index);
  }

  whenAssetValueChanged(
    arg0: AbstractControl<number | null, number | null> | null,
    $event: InputEvent
  ) {
    console.log($event);
    (arg0 as FormControl)?.setValue($event.detail, {
      emitModelToViewChange: true,
      emitViewToModelChange: true,
    });
  }
}
