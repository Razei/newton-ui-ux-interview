import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MockProvider } from 'ng-mocks';
import { AssetStore } from '../../store/asset.store';
import { AssetTableComponent } from './asset-table.component';

describe('AssetTableComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AssetTableComponent],
      providers: [MockProvider(NgbActiveModal), MockProvider(AssetStore)],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AssetTableComponent);
    const component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });
});
