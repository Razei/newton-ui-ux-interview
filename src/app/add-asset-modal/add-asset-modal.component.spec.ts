import { TestBed, waitForAsync } from '@angular/core/testing';
import { AddAssetModalComponent } from './add-asset-modal.component';

describe('AddAssetModalComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddAssetModalComponent],
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
