import { signal } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MockProvider } from 'ng-mocks';
import { AssetStore } from '../../store/asset.store';
import { createNewAssetFormGroup } from '../../utils/asset.utils';
import { AssetFormGroup } from '../add-asset-modal/add-asset-modal.component';
import { AssetTableComponent } from './asset-table.component';

describe('AssetTableComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssetTableComponent],
      providers: [
        MockProvider(NgbActiveModal),
        MockProvider(AssetStore, {
          assetTypes: signal([]),
        }),
      ],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AssetTableComponent);
    const component = fixture.debugElement.componentInstance;
    fixture.componentRef.setInput(
      'assetFormGroup',
      new FormGroup({
        assets: new FormArray<AssetFormGroup>([createNewAssetFormGroup()]),
      })
    );

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });
});
