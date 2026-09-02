import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { ChipComponent } from '../../shared/ui/chip.component';

@Component({
  selector: 'app-intake-page',
  standalone: true,
  imports: [CommonModule, FooterCTAComponent, ChipComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">What's Not Working?</h2>
          <p class="text-rd-text-secondary mb-8">Select all that apply</p>

          <div class="flex flex-wrap gap-3">
            @for (chip of chips(); track chip.id) {
              <app-chip
                [text]="chip.text"
                [selected]="chip.selected"
                (toggle)="toggleChip(chip.id)" />
            }
          </div>
        </div>
      </div>

      <app-footer-cta
        (back)="onBack()"
        (next)="onNext()" />
    </div>
  `
})
export class IntakePage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  chips = this.store.intakeChips;

  toggleChip(chipId: string) {
    this.store.toggleIntakeChip(chipId);
  }

  onBack() {
    this.router.navigate(['/design/focus-area']);
  }

  onNext() {
    this.router.navigate(['/design/as-is']);
  }
}
