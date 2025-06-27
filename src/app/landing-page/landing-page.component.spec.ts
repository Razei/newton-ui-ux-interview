import { TestBed, waitForAsync } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { AssetManagerComponent } from '../asset-manager/asset-manager.component';
import { MockComponent } from 'ng-mocks';

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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render AssetManagerComponent', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-asset-manager')).toBeTruthy();
  });
});
