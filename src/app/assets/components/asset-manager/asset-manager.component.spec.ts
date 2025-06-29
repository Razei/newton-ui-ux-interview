import { CurrencyPipe } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { generateUUID } from '../../../utils/id.utils';
import { queryByTextContent } from '../../../utils/testing.utils';
import { AssetStore } from '../../store/asset.store';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';
import { AssetManagerComponent } from './asset-manager.component';

describe('AssetManagerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssetManagerComponent],
      providers: [CurrencyPipe],
    })
      .overrideComponent(AssetManagerComponent, {
        set: {
          imports: [
            MockComponent(FaIconComponent),
            MockComponent(AddAssetModalComponent),
            CurrencyPipe,
          ],
        },
      })
      .compileComponents();
  }));

  it('should create the component', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });

  it('should show empty state by default', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);

    fixture.detectChanges();
    await fixture.whenStable();

    const title = queryByTextContent(fixture.debugElement, 'No Assets');

    const description = queryByTextContent(
      fixture.debugElement,
      "You currently don't have any Assets…"
    );

    const button = queryByTextContent(
      fixture.debugElement,
      /Add Assets/i,
      'button'
    );

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should render table with asset data if asset store returns data', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const assetStore = fixture.componentRef.injector.get(AssetStore);
    const currencyPipe = fixture.componentRef.injector.get(CurrencyPipe);

    const expectedElement = {
      id: generateUUID(),
      type: 'Gift',
      value: 100,
    };

    const expectedElement2 = {
      id: generateUUID(),
      type: 'RRSP',
      value: 200,
    };

    assetStore.upsertAssets([expectedElement, expectedElement2]);

    fixture.detectChanges();
    await fixture.whenStable();

    const cell1 = queryByTextContent(
      fixture.debugElement,
      expectedElement.type
    );

    const valueCell = queryByTextContent(
      fixture.debugElement,
      currencyPipe.transform(expectedElement.value.toString()) ?? ''
    );

    const cell2 = queryByTextContent(
      fixture.debugElement,
      expectedElement2.type
    );

    const valueCell2 = queryByTextContent(
      fixture.debugElement,
      currencyPipe.transform(expectedElement2.value.toString()) ?? ''
    );

    const total = queryByTextContent(
      fixture.debugElement,
      currencyPipe.transform(
        (expectedElement.value + expectedElement2.value).toString()
      ) ?? ''
    );

    expect(cell1).toBeTruthy();
    expect(valueCell).toBeTruthy();
    expect(cell2).toBeTruthy();
    expect(valueCell2).toBeTruthy();
    expect(total).toBeTruthy();
  });

  it('should change total when assets changed', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const assetStore = fixture.componentRef.injector.get(AssetStore);
    const currencyPipe = fixture.componentRef.injector.get(CurrencyPipe);

    const expectedElement = {
      id: generateUUID(),
      type: 'Gift',
      value: 100,
    };

    const expectedElement2 = {
      id: generateUUID(),
      type: 'RRSP',
      value: 200,
    };

    assetStore.upsertAssets([expectedElement, expectedElement2]);

    fixture.detectChanges();
    await fixture.whenStable();

    const total = queryByTextContent(
      fixture.debugElement,
      currencyPipe.transform(
        (expectedElement.value + expectedElement2.value).toString()
      ) ?? ''
    );

    expect(total).toBeTruthy();

    assetStore.removeAsset(expectedElement2.id);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(total.nativeElement.textContent.trim()).toEqual(
      currencyPipe.transform(expectedElement.value.toString())
    );
  });

  it('should revert to empty state when last item deleted', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const assetStore = fixture.componentRef.injector.get(AssetStore);
    const currencyPipe = fixture.componentRef.injector.get(CurrencyPipe);

    const expectedElement = {
      id: generateUUID(),
      type: 'Gift',
      value: 100,
    };

    assetStore.upsertAssets([expectedElement]);

    fixture.detectChanges();
    await fixture.whenStable();

    const total = queryByTextContent(
      fixture.debugElement,
      currencyPipe.transform(expectedElement.value.toString()) ?? ''
    );

    expect(total).toBeTruthy();

    assetStore.removeAsset(expectedElement.id);

    fixture.detectChanges();
    await fixture.whenStable();

    const title = queryByTextContent(fixture.debugElement, 'No Assets');

    const description = queryByTextContent(
      fixture.debugElement,
      "You currently don't have any Assets…"
    );

    const button = queryByTextContent(
      fixture.debugElement,
      /Add Assets/i,
      'button'
    );

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
  });

  describe('whenAddAssetsButtonClicked', () => {
    it('should open modal when button clicked', async () => {
      const fixture = TestBed.createComponent(AssetManagerComponent);

      const modalService = fixture.componentRef.injector.get(NgbModal);
      const spy = spyOn(modalService, 'open').and.callThrough();

      fixture.detectChanges();
      await fixture.whenStable();

      const button = queryByTextContent(
        fixture.debugElement,
        /Add Assets/i,
        'button'
      );

      expect(button.nativeElement).toBeTruthy();

      button.nativeElement.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalled();
    });
  });
});
