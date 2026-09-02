import { Injectable, signal, computed } from '@angular/core';
import { DesignSession, FocusArea, AsIsStage, Bottleneck, Outcome, DailyCheckIn } from './types';
import { MORNING_ENERGY_FIXTURE } from './mock-fixtures';

@Injectable({
  providedIn: 'root'
})
export class DesignSessionStore {
  private session = signal<DesignSession>(MORNING_ENERGY_FIXTURE);

  readonly focusArea = computed(() => this.session().focusArea);
  readonly intakeChips = computed(() => this.session().intakeChips);
  readonly asIsLoop = computed(() => this.session().asIsLoop);
  readonly bottleneck = computed(() => this.session().bottleneck);
  readonly outcome = computed(() => this.session().outcome);
  readonly toBeLoop = computed(() => this.session().toBeLoop);
  readonly dailyCheckIns = computed(() => this.session().dailyCheckIns);
  readonly todayDay = computed(() => this.session().todayDay);

  setFocusArea(focusArea: FocusArea) {
    this.session.update(s => ({ ...s, focusArea }));
  }

  toggleIntakeChip(chipId: string) {
    this.session.update(s => ({
      ...s,
      intakeChips: s.intakeChips.map(chip =>
        chip.id === chipId ? { ...chip, selected: !chip.selected } : chip
      )
    }));
  }

  updateAsIsStage(index: number, patch: Partial<Pick<AsIsStage, 'title' | 'body'>>) {
    this.session.update(s => ({
      ...s,
      asIsLoop: s.asIsLoop.map((stage, i) =>
        i === index ? { ...stage, ...patch } : stage
      )
    }));
  }

  reorderAsIsStages(previousIndex: number, currentIndex: number) {
    if (previousIndex === currentIndex) {
      return;
    }
    this.session.update(s => {
      const asIsLoop = [...s.asIsLoop];
      const [moved] = asIsLoop.splice(previousIndex, 1);
      asIsLoop.splice(currentIndex, 0, moved);
      return { ...s, asIsLoop };
    });
  }

  setBottleneck(bottleneck: Bottleneck) {
    this.session.update(s => ({ ...s, bottleneck }));
  }

  updateOutcome(outcome: Outcome) {
    this.session.update(s => ({ ...s, outcome }));
  }

  updateDailyCheckIn(day: number, completed: boolean) {
    this.session.update(s => ({
      ...s,
      dailyCheckIns: s.dailyCheckIns.map((checkIn: DailyCheckIn) =>
        checkIn.day === day && !checkIn.deferred
          ? { ...checkIn, completed }
          : checkIn
      )
    }));
  }
}
