import { DecimalPipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';

/**
 * https://stackoverflow.com/a/56741093
 */
@Directive({
  selector: '[maskCurrency]',
  providers: [DecimalPipe],
})
export class CurrencyMaskDirective implements OnInit {
  //#region Dependencies
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  //#endregion

  readonly currencyChars = new RegExp('[\,]', 'g');
  readonly lastValue = signal('');

  ngOnInit() {
    this.format(this.el.nativeElement.value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(e: string) {
    this.format(e);
  }

  format(val: string) {
    if (!val || val === this.lastValue()) {
      return;
    }

    const [integer, decimal] = val.replace(this.currencyChars, '').split('.');
    // 1. test for non-number characters and replace/remove them
    const formatter = new Intl.NumberFormat('en-US');
    const currency = formatter.format(BigInt(integer));

    const parsedDecimal = parseFloat('0.' + decimal) ?? 0;
    const roundedDecimal =
      parsedDecimal > 0
        ? parsedDecimal.toFixed(2).toString().split('0.')[1]
        : '00';

    // replace the input value with formatted numbers
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      currency + '.' + roundedDecimal
    );

    this.lastValue.set(currency + '.' + roundedDecimal);
  }
}
