import { Injectable, signal, computed } from '@angular/core';
import { DesignSession, FocusArea, IntakeChip, AsIsStage, Bottleneck, Outcome, ToBeStage, DailyCheckIn } from './types';
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

  updateAsIsStage(index: number, content: string) {
    this.session.update(s => ({
      ...s,
      asIsLoop: s.asIsLoop.map((stage, i) =>
        i === index ? { ...stage, content } : stage
      )
    }));
  }

  setBottleneck(bottleneck: Bottleneck) {
    this.session.update(s => ({ ...s, bottleneck }));
  }

  updateOutcome(outcome: Outcome) {
    this.session.update(s => ({ ...s, outcome }));
  }

  updateToBeStage(index: number, content: string) {
    this.session.update(s => ({
      ...s,
      toBeLoop: s.toBeLoop.map((stage, i) =>
        i === index ? { ...stage, content } : stage
      )
    }));
  }

  updateDailyCheckIn(day: number, completed: boolean) {
    this.session.update(s => ({
      ...s,
      dailyCheckIns: s.dailyCheckIns.map(checkIn =>
        checkIn.day === day ? { ...checkIn, completed } : checkIn
      )
    }));
  }
}
