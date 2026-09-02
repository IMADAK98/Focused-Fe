import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { ChipComponent } from '../../shared/ui/chip.component';

@Component({
  selector: 'app-intake-page',
  standalone: true,
  imports: [FooterCTAComponent, ChipComponent],
  templateUrl: './intake.page.html',
  styleUrl: './intake.page.css'
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
    void this.store.saveIntake().then(() => this.router.navigate(['/design/as-is']));
  }
}
