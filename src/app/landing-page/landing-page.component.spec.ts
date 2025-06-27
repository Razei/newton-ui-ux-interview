import { TestBed, waitForAsync } from '@angular/core/testing'; 
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => { 
  beforeEach(waitForAsync(() => { 
    TestBed.configureTestingModule({
      imports: [
        LandingPageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});