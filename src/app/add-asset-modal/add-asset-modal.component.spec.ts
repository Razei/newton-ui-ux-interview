import { TestBed, waitForAsync } from '@angular/core/testing';
import { AddAssetModalComponent } from './add-asset-modal.component';
import { MockProvider } from 'ng-mocks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetStore } from '../assets/asset.store';

describe('AddAssetModalComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddAssetModalComponent],
      providers: [MockProvider(NgbActiveModal), MockProvider(AssetStore)],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AddAssetModalComponent);
    const component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });
});
