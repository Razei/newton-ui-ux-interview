import { TestBed, waitForAsync } from '@angular/core/testing'; 
import { AssetManagerComponent } from './asset-manager.component';

describe('AssetManagerComponent', () => { 
  beforeEach(waitForAsync(() => { 
    TestBed.configureTestingModule({
      imports: [
        AssetManagerComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AssetManagerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});