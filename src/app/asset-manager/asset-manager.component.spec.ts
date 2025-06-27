import { TestBed, waitForAsync } from '@angular/core/testing';
import { AssetManagerComponent } from './asset-manager.component';
import { MockComponent } from 'ng-mocks';
import { AddAssetModalComponent } from '../add-asset-modal/add-asset-modal.component';

describe('AssetManagerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssetManagerComponent, MockComponent(AddAssetModalComponent)],
    }).compileComponents();
  }));

  it('should create the component', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });

  it('should render AddAssetModalComponent when showModal is true', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const component = fixture.debugElement.componentInstance;
    const container = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    await fixture.whenStable();

    component.showModal.set(true);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(container.querySelector('app-add-asset-modal')).toBeTruthy();
  });

  it('should not render AddAssetModalComponent when showModal is false', async () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const component = fixture.debugElement.componentInstance;
    const container = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    await fixture.whenStable();

    component.showModal.set(false);

    expect(container.querySelector('app-add-asset-modal')).toBeFalsy();
  });
});
