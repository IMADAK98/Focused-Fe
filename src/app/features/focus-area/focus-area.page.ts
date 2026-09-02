import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FOCUS_AREAS } from '../../core/session/mock-fixtures';
import { FocusArea } from '../../core/session/types';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';

@Component({
  selector: 'app-focus-area-page',
  standalone: true,
  imports: [FooterCTAComponent],
  templateUrl: './focus-area.page.html',
  styleUrl: './focus-area.page.css'
})
export class FocusAreaPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  focusAreas = FOCUS_AREAS;
  selectedArea = this.store.focusArea;

  isSelected(area: FocusArea): boolean {
    return this.selectedArea()?.id === area.id;
  }

  selectFocusArea(area: FocusArea) {
    this.store.setFocusArea(area);
  }

  onNext() {
    this.router.navigate(['/design/intake']);
  }
}
