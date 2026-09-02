import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { YesNoToggleComponent } from '../../shared/ui/yes-no-toggle.component';

@Component({
  selector: 'app-daily-run-page',
  standalone: true,
  imports: [CommonModule, FooterCTAComponent, YesNoToggleComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">7-Day Run</h2>
          <p class="text-rd-text-secondary mb-8">Track your progress daily</p>

          <div class="bg-rd-surface border border-rd-border rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-rd-text-primary mb-2">Your Target</h3>
            @if (outcome()) {
              <p class="text-sm text-rd-text-primary">{{ outcome()!.what }}</p>
            }
          </div>

          <div class="space-y-3">
            @for (checkIn of dailyCheckIns(); track checkIn.day) {
              <div class="bg-rd-surface border border-rd-border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-3">
                    <span class="text-lg font-semibold text-rd-text-primary">Day {{ checkIn.day }}</span>
                    <span class="text-sm text-rd-text-secondary">{{ checkIn.date }}</span>
                  </div>
                  <p class="text-sm text-rd-text-secondary mt-1">Did you complete your routine?</p>
                </div>
                <app-yes-no-toggle
                  [value]="checkIn.completed"
                  (valueChange)="updateCheckIn(checkIn.day, $event)" />
              </div>
            }
          </div>

          <div class="mt-6 bg-rd-accent-soft border border-rd-accent rounded-lg p-4">
            <p class="text-sm text-rd-accent">
              <strong>Tip:</strong> Be honest with yourself. The goal isn't perfection—it's learning what works.
            </p>
          </div>
        </div>
      </div>

      <app-footer-cta
        (back)="onBack()"
        nextLabel="Finish"
        (next)="onNext()" />
    </div>
  `
})
export class DailyRunPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  outcome = this.store.outcome;
  dailyCheckIns = this.store.dailyCheckIns;

  updateCheckIn(day: number, completed: boolean) {
    this.store.updateDailyCheckIn(day, completed);
  }

  onBack() {
    this.router.navigate(['/design/to-be']);
  }

  onNext() {
    alert('Routine design complete! (Demo ends here)');
  }
}
