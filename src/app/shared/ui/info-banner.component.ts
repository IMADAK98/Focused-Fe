import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  templateUrl: './info-banner.component.html',
  styleUrl: './info-banner.component.css'
})
export class InfoBannerComponent {
  variant = input<'bottleneck' | 'accent' | 'muted'>('muted');
}
