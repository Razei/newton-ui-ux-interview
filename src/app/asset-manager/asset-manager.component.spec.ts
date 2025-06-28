import { TestBed, waitForAsync } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';
import { AssetManagerComponent } from './asset-manager.component';

describe('AssetManagerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssetManagerComponent],
    })
      .overrideComponent(AssetManagerComponent, {
        set: {
          imports: [
            MockComponent(FaIconComponent),
            MockComponent(AddAssetModalComponent),
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

  describe('whenAddAssetsButtonClicked', () => {
    it('should open modal when button clicked', async () => {
      const fixture = TestBed.createComponent(AssetManagerComponent);

      const modalService = fixture.componentRef.injector.get(NgbModal);
      const spy = spyOn(modalService, 'open').and.callThrough();

      fixture.detectChanges();
      await fixture.whenStable();

      const button = fixture.debugElement.query(
        (debugEl) =>
          debugEl.name === 'button' &&
          !!(debugEl.nativeElement as HTMLElement).textContent?.match(
            /Add Asset/i
          )
      );

      button.nativeElement.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalledWith(AddAssetModalComponent, {
        scrollable: true,
        injector: fixture.componentRef.injector,
      });
    });
  });
});
