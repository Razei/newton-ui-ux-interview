import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNaNValidator } from '../../utils/validators/validators.utils';
import { AssetControls } from '../components/add-asset-modal/add-asset-modal.component';

export const createNewAssetFormGroup = () => {
  return new FormGroup<AssetControls>({
    id: new FormControl(null),
    type: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    value: new FormControl(null, {
      validators: [Validators.required, isNaNValidator],
    }),
  });
};
