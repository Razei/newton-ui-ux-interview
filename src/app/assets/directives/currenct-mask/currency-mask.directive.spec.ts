import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrencyMaskDirective } from './currency-mask.directive';

describe('CurrencyMaskDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [],
    }).compileComponents();
  }));

  it('should create the directive', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.debugElement.componentInstance;
    const directive = fixture.debugElement.query(
      By.directive(CurrencyMaskDirective)
    );

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should not format empty values', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('');
  });

  it('should ignore values when input is not a number', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = 'a21313';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('a21313');
  });

  it('should format input to currency on blur', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '1000';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('1,000.00');
  });

  it('should preserve decimals when formatting to currency on blur', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '1000.56';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('1,000.56');
  });

  it('should round extra decimals when formatting to currency on blur', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '1.3549999999999998';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('1.35');
  });

  it('should add 0 for decimal only values', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '.3549999999999998';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('0.35');
  });

  it('should output the same value if value is already formatted', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '12,313,112,331,231,331,132,131.00';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('12,313,112,331,231,331,132,131.00');
  });

  it('should format negative numbers', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '-1000.56';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('-1,000.56');
  });

  it('should format really long numbers to currency', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    inputElement.value = '1234567890123456789012.225';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toEqual('1,234,567,890,123,456,789,012.23');
  });
});

@Component({
  selector: 'test-component',
  imports: [CurrencyMaskDirective],
  template: ` <input type="text" maskCurrency /> `,
})
class TestComponent {}
