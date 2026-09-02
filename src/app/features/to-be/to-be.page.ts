import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { StageCardComponent } from '../../shared/ui/stage-card.component';
import { OutcomeCalloutComponent } from '../../shared/ui/outcome-callout.component';
import { InfoBannerComponent } from '../../shared/ui/info-banner.component';

@Component({
  selector: 'app-to-be-page',
  standalone: true,
  imports: [FooterCTAComponent, StageCardComponent, OutcomeCalloutComponent, InfoBannerComponent],
  templateUrl: './to-be.page.html',
  styleUrl: './to-be.page.css'
})
export class ToBePage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  outcome = this.store.outcome;
  toBeLoop = this.store.toBeLoop;
  focusArea = this.store.focusArea;

  onBack() {
    this.router.navigate(['/design/calibration']);
  }

  onNext() {
    this.router.navigate(['/design/daily-run']);
  }
}
