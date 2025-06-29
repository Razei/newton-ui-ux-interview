import { AbstractControl, ValidatorFn } from '@angular/forms';

export const isNaNValidator: ValidatorFn = (control: AbstractControl) => {
  const number = Number(control.value?.replace(/[\,]/g, ''));

  if (isNaN(number)) {
    return { isNaN: true };
  }

  return null;
};
