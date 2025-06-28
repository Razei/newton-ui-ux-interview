import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetManagerComponent } from '../assets/components/asset-manager/asset-manager.component';

@Component({
  selector: 'app-landing-page',
  imports: [AssetManagerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
