import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { StageCardComponent } from '../../shared/ui/stage-card.component';

@Component({
  selector: 'app-to-be-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterCTAComponent, StageCardComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">Your Target Loop</h2>
          <p class="text-rd-text-secondary mb-8">Design the routine that works</p>

          <div class="bg-rd-surface border border-rd-border rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-rd-text-primary mb-3">Outcome</h3>
            @if (outcome()) {
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-rd-text-secondary mb-1">What</label>
                  <input
                    type="text"
                    [value]="outcome()!.what"
                    (input)="updateOutcomeWhat($event)"
                    class="w-full px-3 py-2 border border-rd-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rd-accent"
                    placeholder="What do you want to achieve?" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-rd-text-secondary mb-1">Why</label>
                  <input
                    type="text"
                    [value]="outcome()!.why"
                    (input)="updateOutcomeWhy($event)"
                    class="w-full px-3 py-2 border border-rd-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rd-accent"
                    placeholder="Why does this matter?" />
                </div>
              </div>
            }
          </div>

          <div class="space-y-4">
            @for (stage of toBeLoop(); track $index) {
              <app-stage-card
                [type]="stage.type"
                [content]="stage.content"
                [editable]="true"
                (contentChange)="updateStage($index, $event)" />
            }
          </div>
        </div>
      </div>

      <app-footer-cta
        (back)="onBack()"
        nextLabel="Start 7-Day Run"
        (next)="onNext()" />
    </div>
  `
})
export class ToBePage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  outcome = this.store.outcome;
  toBeLoop = this.store.toBeLoop;

  updateOutcomeWhat(event: Event) {
    const target = event.target as HTMLInputElement;
    const current = this.outcome();
    if (current) {
      this.store.updateOutcome({ ...current, what: target.value });
    }
  }

  updateOutcomeWhy(event: Event) {
    const target = event.target as HTMLInputElement;
    const current = this.outcome();
    if (current) {
      this.store.updateOutcome({ ...current, why: target.value });
    }
  }

  updateStage(index: number, content: string) {
    this.store.updateToBeStage(index, content);
  }

  onBack() {
    this.router.navigate(['/design/calibration']);
  }

  onNext() {
    this.router.navigate(['/design/daily-run']);
  }
}
