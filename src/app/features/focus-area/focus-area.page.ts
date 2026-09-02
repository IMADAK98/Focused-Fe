import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FOCUS_AREAS } from '../../core/session/mock-fixtures';
import { FocusArea } from '../../core/session/types';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';

@Component({
  selector: 'app-focus-area-page',
  standalone: true,
  imports: [CommonModule, FooterCTAComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">Choose Your Focus Area</h2>
          <p class="text-rd-text-secondary mb-8">Select the routine you want to design</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (area of focusAreas; track area.id) {
              <button
                (click)="selectFocusArea(area)"
                [class]="getCardClass(area)">
                <h3 class="text-lg font-semibold mb-2">{{ area.name }}</h3>
                <p class="text-sm text-rd-text-secondary">{{ area.description }}</p>
              </button>
            }
          </div>
        </div>
      </div>

      <app-footer-cta
        [showBack]="false"
        (next)="onNext()" />
    </div>
  `
})
export class FocusAreaPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  focusAreas = FOCUS_AREAS;
  selectedArea = this.store.focusArea;

  getCardClass(area: FocusArea): string {
    const base = 'bg-rd-surface border-2 rounded-lg p-6 text-left transition-all hover:shadow-md';
    const isSelected = this.selectedArea()?.id === area.id;
    
    if (isSelected) {
      return `${base} border-rd-accent shadow-md`;
    } else {
      return `${base} border-rd-border hover:border-rd-accent`;
    }
  }

  selectFocusArea(area: FocusArea) {
    this.store.setFocusArea(area);
  }

  onNext() {
    this.router.navigate(['/design/intake']);
  }
}
