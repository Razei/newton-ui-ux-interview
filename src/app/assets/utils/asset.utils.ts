import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetControls } from '../components/add-asset-modal/add-asset-modal.component';

export const createNewAssetFormGroup = () => {
  return new FormGroup<AssetControls>({
    id: new FormControl(null),
    type: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    value: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.pattern(/^([0-9]+(\.?[0-9]?[0-9]?)?)/),
      ],
    }),
  });
};
