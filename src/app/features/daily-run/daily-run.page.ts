import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { DailyCheckIn } from '../../core/session/types';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { YesNoToggleComponent } from '../../shared/ui/yes-no-toggle.component';
import { InfoBannerComponent } from '../../shared/ui/info-banner.component';

type DayKind = 'yes' | 'no' | 'today' | 'upcoming' | 'deferred';

@Component({
  selector: 'app-daily-run-page',
  standalone: true,
  imports: [FooterCTAComponent, YesNoToggleComponent, InfoBannerComponent],
  templateUrl: './daily-run.page.html',
  styleUrl: './daily-run.page.css'
})
export class DailyRunPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  outcome = this.store.outcome;
  dailyCheckIns = this.store.dailyCheckIns;
  todayDay = this.store.todayDay;
  focusArea = this.store.focusArea;

  filledCount = computed(() =>
    this.dailyCheckIns().filter(day => !day.deferred && day.completed !== null).length
  );

  checkInTotal = computed(() =>
    this.dailyCheckIns().filter(day => !day.deferred).length
  );

  progressPct = computed(() => {
    const total = this.checkInTotal();
    return total === 0 ? 0 : (this.filledCount() / total) * 100;
  });

  kindOf(day: DailyCheckIn): DayKind {
    if (day.deferred) {
      return 'deferred';
    }
    if (day.day === this.todayDay()) {
      return 'today';
    }
    if (day.day > this.todayDay()) {
      return 'upcoming';
    }
    return day.completed ? 'yes' : 'no';
  }

  kindLabel(day: DailyCheckIn): string {
    const kind = this.kindOf(day);
    if (kind === 'upcoming') {
      return 'Upcoming';
    }
    if (kind === 'deferred') {
      return '';
    }
    return 'DailyCheckIn';
  }

  statusLabel(day: DailyCheckIn): string {
    if (day.completed === true) {
      return 'Did the To-Be';
    }
    if (day.completed === false && this.kindOf(day) !== 'upcoming') {
      return 'Missed today';
    }
    switch (this.kindOf(day)) {
      case 'today':
        return 'Tap Yes or No';
      case 'deferred':
        return 'No deep Day-7 UI';
      default:
        return '';
    }
  }

  updateCheckIn(day: number, completed: boolean) {
    this.store.updateDailyCheckIn(day, completed);
  }

  onBack() {
    this.router.navigate(['/design/to-be']);
  }

  onSave() {
    // ponytail: in-memory store already writes on toggle; Save is chrome only.
  }
}
