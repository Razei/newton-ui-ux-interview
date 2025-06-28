import { TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AssetManagerComponent } from '../assets/components/asset-manager/asset-manager.component';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LandingPageComponent, AssetManagerComponent],
    })
      .overrideComponent(LandingPageComponent, {
        set: {
          imports: [MockComponent(AssetManagerComponent)],
        },
      })

      .compileComponents();
  }));

  it('should create the component', async () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });

  it('should render AssetManagerComponent', async () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const container = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(container.querySelector('app-asset-manager')).toBeTruthy();
  });
});
