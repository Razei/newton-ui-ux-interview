import { DecimalPipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
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
  private readonly decimalPipe = inject(DecimalPipe);
  //#endregion

  readonly currencyChars = new RegExp('[\.,]', 'g');

  ngOnInit() {
    this.format(this.el.nativeElement.value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(e: string) {
    this.format(e);
  }

  format(val: string) {
    // 1. test for non-number characters and replace/remove them
    const numberFormat = parseInt(String(val).replace(this.currencyChars, ''));
    // console.log(numberFormat); // raw number

    // 2. format the number (add commas)
    const currency = this.decimalPipe.transform(numberFormat, '1.2', 'en-US');

    // 3. replace the input value with formatted numbers
    this.renderer.setProperty(this.el.nativeElement, 'value', currency);
  }
}
