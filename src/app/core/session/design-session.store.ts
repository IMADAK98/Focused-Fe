import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FocusedApiService } from '../api/focused-api.service';
import { DesignSession, FocusArea, AsIsStage, Bottleneck, Outcome, DailyCheckIn, LoopStage, StageType } from './types';
import { FOCUS_AREAS, MORNING_ENERGY_FIXTURE } from './mock-fixtures';

const STAGE_TYPES: StageType[] = ['cue', 'environment', 'friction'];

@Injectable({
  providedIn: 'root'
})
export class DesignSessionStore {
  private readonly api = inject(FocusedApiService);
  private session = signal<DesignSession>(MORNING_ENERGY_FIXTURE);
  private raw = signal<Record<string, unknown> | null>(null);

  readonly catalog = signal<FocusArea[]>(FOCUS_AREAS);
  readonly error = signal<string | null>(null);
  readonly apiId = signal<string | null>(null);

  readonly focusArea = computed(() => this.session().focusArea);
  readonly intakeChips = computed(() => this.session().intakeChips);
  readonly asIsLoop = computed(() => this.session().asIsLoop);
  readonly bottleneck = computed(() => this.session().bottleneck);
  readonly outcome = computed(() => this.session().outcome);
  readonly toBeLoop = computed(() => this.session().toBeLoop);
  readonly dailyCheckIns = computed(() => this.session().dailyCheckIns);
  readonly todayDay = computed(() => this.session().todayDay);

  async bootstrap(): Promise<void> {
    this.error.set(null);
    try {
      const [catalog, seeded] = await Promise.all([
        firstValueFrom(this.api.getCatalog()),
        firstValueFrom(this.api.seedMorningEnergy())
      ]);
      this.catalog.set(catalog);
      this.applyApi(seeded);
    } catch {
      this.error.set(
        'Cannot reach the Focused API at http://localhost:8080. Start the backend with `./mvnw spring-boot:run`, then reload.'
      );
    }
  }

  async selectFocusArea(focusArea: FocusArea): Promise<void> {
    this.error.set(null);
    try {
      const body = focusArea.id === 'morning-energy'
        ? await firstValueFrom(this.api.seedMorningEnergy())
        : await firstValueFrom(this.api.createFocusArea(focusArea.id));
      this.applyApi(body);
    } catch {
      this.error.set(
        'Cannot reach the Focused API at http://localhost:8080. Start the backend with `./mvnw spring-boot:run`, then reload.'
      );
    }
  }

  setFocusArea(focusArea: FocusArea) {
    void this.selectFocusArea(focusArea);
  }

  toggleIntakeChip(chipId: string) {
    this.session.update(s => ({
      ...s,
      intakeChips: s.intakeChips.map(chip =>
        chip.id === chipId ? { ...chip, selected: !chip.selected } : chip
      )
    }));
  }

  async saveIntake(): Promise<void> {
    const id = this.apiId();
    const raw = this.raw() as { intake?: Record<string, unknown> } | null;
    if (!id) {
      return;
    }
    const intake = {
      ...(raw?.intake ?? {}),
      chips: this.intakeChips(),
      selectedHabits: this.intakeChips().filter(c => c.selected).map(c => c.text)
    };
    this.applyApi(await firstValueFrom(this.api.saveIntake(id, intake)));
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

  async saveAsIs(): Promise<void> {
    const id = this.apiId();
    const raw = this.raw() as { asIsLoop?: { stages?: Array<Record<string, unknown>> } } | null;
    if (!id || !raw?.asIsLoop) {
      return;
    }
    this.applyApi(await firstValueFrom(this.api.updateAsIs(id, raw.asIsLoop)));
  }

  setBottleneck(bottleneck: Bottleneck) {
    this.session.update(s => ({ ...s, bottleneck }));
  }

  async confirmCalibration(): Promise<void> {
    const id = this.apiId();
    const raw = this.raw() as { bottleneck?: { candidateIndex?: number; confirmedIndex?: number } } | null;
    if (!id) {
      return;
    }
    const index = raw?.bottleneck?.confirmedIndex ?? raw?.bottleneck?.candidateIndex ?? 0;
    this.applyApi(await firstValueFrom(this.api.calibrate(id, index)));
  }

  updateOutcome(outcome: Outcome) {
    this.session.update(s => ({ ...s, outcome }));
  }

  async confirmToBe(): Promise<void> {
    const id = this.apiId();
    const raw = this.raw() as { toBeLoop?: unknown; outcome?: unknown } | null;
    if (!id) {
      return;
    }
    if (raw?.toBeLoop) {
      await firstValueFrom(this.api.updateToBe(id, { toBeLoop: raw.toBeLoop, outcome: raw.outcome }));
    }
    this.applyApi(await firstValueFrom(this.api.confirmToBe(id)));
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
    const id = this.apiId();
    if (id) {
      void firstValueFrom(this.api.submitCheckIn(id, day, completed));
    }
  }

  private applyApi(api: Record<string, unknown>): void {
    this.raw.set(api);
    this.apiId.set(String(api['id'] ?? ''));
    this.session.set(toUiSession(api));
  }
}

function mapStages(stages: unknown, prefix: string): LoopStage[] {
  if (!Array.isArray(stages)) {
    return [];
  }
  return stages.map((stage, index) => {
    const row = stage as Record<string, unknown>;
    const position = Number(row['position'] ?? index);
    return {
      id: `${prefix}-${position}`,
      type: STAGE_TYPES[position % 3],
      title: String(row['title'] ?? ''),
      body: [row['cue'], row['environment'], row['currentFriction']].filter(Boolean).join(' · '),
      intervention: row['redesignIntervention'] ? String(row['redesignIntervention']) : undefined
    };
  });
}

function toUiSession(api: Record<string, unknown>): DesignSession {
  const asIs = api['asIsLoop'] as { stages?: unknown; primaryFrictionAnalysis?: string } | undefined;
  const bottleneckRaw = api['bottleneck'] as { candidateIndex?: number; confirmedIndex?: number; primaryFrictionAnalysis?: string } | undefined;
  const asIsLoop = mapStages(asIs?.stages, 'asis');
  const idx = bottleneckRaw?.confirmedIndex ?? bottleneckRaw?.candidateIndex;
  const bottleneckStage = idx != null ? asIsLoop[idx] : undefined;
  const run = api['run'] as { dailyCheckIns?: Array<Record<string, unknown>> } | undefined;
  const outcomeRaw = api['outcome'] as { statement?: string; successCriteria?: string[] } | undefined;
  const checkIns = (run?.dailyCheckIns ?? []).map((row) => {
    const date = String(row['checkInDate'] ?? '');
    const weekday = date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short' }) : '';
    return {
      day: Number(row['day']),
      weekday,
      completed: row['success'] == null ? null : Boolean(row['success']),
      deferred: false
    };
  });
  const today = checkIns.find(c => c.completed == null)?.day ?? 1;
  return {
    focusArea: {
      id: String(api['id'] ?? ''),
      name: String(api['name'] ?? ''),
      description: String(api['description'] ?? '')
    },
    intakeChips: ((api['intake'] as { chips?: DesignSession['intakeChips'] } | undefined)?.chips) ?? [],
    asIsLoop,
    bottleneck: bottleneckStage
      ? {
          stageId: bottleneckStage.id,
          stage: bottleneckStage.type,
          title: bottleneckStage.title,
          reason: String(bottleneckRaw?.primaryFrictionAnalysis ?? asIs?.primaryFrictionAnalysis ?? '')
        }
      : null,
    outcome: outcomeRaw
      ? {
          statement: String(outcomeRaw.statement ?? ''),
          bottleneckNote: (outcomeRaw.successCriteria ?? []).join(' · ')
        }
      : null,
    toBeLoop: mapStages((api['toBeLoop'] as { stages?: unknown } | undefined)?.stages, 'tobe'),
    dailyCheckIns: checkIns.length ? checkIns : MORNING_ENERGY_FIXTURE.dailyCheckIns,
    todayDay: today
  };
}
