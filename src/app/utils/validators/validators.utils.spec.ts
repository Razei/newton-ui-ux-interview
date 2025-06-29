import { FormControl } from '@angular/forms';
import { isNaNValidator } from './validators.utils';

describe('Validator Utils', () => {
  it('should return isNaN if value cannot be parsed as a number', () => {
    const control = new FormControl('a12441');
    const result = isNaNValidator(control);

    expect(result).toEqual({ isNaN: true });
  });

  it('should return null if value can be parsed as a number', () => {
    const control = new FormControl('12441');
    const result = isNaNValidator(control);

    expect(result).toEqual(null);
  });
});
