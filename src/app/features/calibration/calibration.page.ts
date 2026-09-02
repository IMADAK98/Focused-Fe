import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { BottleneckCalloutComponent } from '../../shared/ui/bottleneck-callout.component';

@Component({
  selector: 'app-calibration-page',
  standalone: true,
  imports: [FooterCTAComponent, BottleneckCalloutComponent],
  templateUrl: './calibration.page.html',
  styleUrl: './calibration.page.css'
})
export class CalibrationPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  bottleneck = this.store.bottleneck;

  onBack() {
    this.router.navigate(['/design/as-is']);
  }

  onNext() {
    this.router.navigate(['/design/to-be']);
  }
}
