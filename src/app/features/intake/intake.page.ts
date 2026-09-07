import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { IntakeChip } from '../../core/session/types';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { ChipComponent } from '../../shared/ui/chip.component';

const COLLAPSED_VISIBLE = 6;

@Component({
  selector: 'app-intake-page',
  standalone: true,
  imports: [FooterCTAComponent, ChipComponent],
  templateUrl: './intake.page.html',
  styleUrl: './intake.page.css'
})
export class IntakePage implements OnInit {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  readonly loading = this.store.intakeCatalogLoading;
  readonly catalogError = this.store.intakeCatalogError;
  readonly canContinue = this.store.canContinueIntake;
  readonly selectedCount = this.store.selectedIntakeCount;
  readonly expanded = signal(false);

  private allChips = this.store.intakeChips;

  readonly subcopy = computed(() => {
    const count = this.selectedCount();
    if (count === 0) {
      return 'Tap what gets in the way.';
    }
    if (count >= 3) {
      return 'Pick up to 3.';
    }
    return `Pick up to 3. (${count} selected)`;
  });

  readonly visibleChips = computed(() => this.buildVisibleChips(this.allChips(), this.expanded()));
  readonly showToggle = computed(() => this.allChips().length > COLLAPSED_VISIBLE);

  ngOnInit(): void {
    void this.store.loadIntakeCatalog();
  }

  toggleChip(chipId: string) {
    this.store.toggleIntakeChip(chipId);
  }

  toggleExpanded() {
    this.expanded.update(value => !value);
  }

  onBack() {
    this.router.navigate(['/design/focus-area']);
  }

  onNext() {
    if (!this.canContinue()) {
      return;
    }
    void this.store.saveIntake().then(() => this.router.navigate(['/design/as-is']));
  }

  private buildVisibleChips(chips: IntakeChip[], expanded: boolean): IntakeChip[] {
    if (expanded || chips.length <= COLLAPSED_VISIBLE) {
      return chips;
    }

    const topSix = chips.slice(0, COLLAPSED_VISIBLE);
    const topSixIds = new Set(topSix.map(chip => chip.id));
    const pinned = chips.filter(chip => chip.selected && !topSixIds.has(chip.id));
    return [...topSix, ...pinned];
  }
}
