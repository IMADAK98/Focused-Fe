import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { BottleneckCalloutComponent } from '../../shared/ui/bottleneck-callout.component';

@Component({
  selector: 'app-calibration-page',
  standalone: true,
  imports: [CommonModule, FooterCTAComponent, BottleneckCalloutComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">Bottleneck Calibration</h2>
          <p class="text-rd-text-secondary mb-8">We've identified the key friction point</p>

          @if (bottleneck()) {
            <app-bottleneck-callout [bottleneck]="bottleneck()" />
          }

          <div class="mt-8 bg-rd-surface border border-rd-border rounded-lg p-6">
            <h3 class="text-lg font-semibold text-rd-text-primary mb-4">Does this feel right?</h3>
            <p class="text-sm text-rd-text-secondary mb-4">
              This is the biggest barrier keeping your routine from working. 
              Fix this, and the rest gets easier.
            </p>
            <div class="flex gap-3">
              <button
                class="px-6 py-2 bg-rd-success text-white rounded-md font-semibold hover:opacity-90">
                Yes, that's it
              </button>
              <button
                class="px-6 py-2 bg-rd-surface border border-rd-border text-rd-text-primary rounded-md font-semibold hover:bg-gray-50">
                Let me adjust
              </button>
            </div>
          </div>
        </div>
      </div>

      <app-footer-cta
        (back)="onBack()"
        (next)="onNext()" />
    </div>
  `
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
