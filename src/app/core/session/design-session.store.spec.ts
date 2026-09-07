import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DesignSessionStore, INTAKE_MAX_SELECTIONS } from './design-session.store';
import { IntakeChipCatalogItem } from './types';

describe('DesignSessionStore', () => {
  let store: DesignSessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    store = TestBed.inject(DesignSessionStore);
  });

  it('keeps the bottleneck on the same stage id after reorder', () => {
    const bottleneckId = store.bottleneck()!.stageId;
    const from = store.asIsLoop().findIndex(stage => stage.id === bottleneckId);

    store.reorderAsIsStages(from, 0);

    expect(store.bottleneck()!.stageId).toBe(bottleneckId);
    expect(store.asIsLoop()[0].id).toBe(bottleneckId);
  });

  it('records a Yes/No check-in for today without touching Day 7', () => {
    store.updateDailyCheckIn(4, true);
    store.updateDailyCheckIn(7, true);

    expect(store.dailyCheckIns()[3].completed).toBe(true);
    expect(store.dailyCheckIns()[6].completed).toBeNull();
    expect(store.dailyCheckIns()[6].deferred).toBe(true);
  });

  it('allows up to INTAKE_MAX_SELECTIONS whats_not_working chips and blocks extras', () => {
    const catalog: IntakeChipCatalogItem[] = Array.from({ length: INTAKE_MAX_SELECTIONS + 1 }, (_, i) => ({
      id: `chip-${i}`,
      label: `Chip ${i}`,
      group: 'energy',
      sortOrder: i,
      focusAreaId: 'morning-energy',
      intakeKind: 'whats_not_working'
    }));
    store.intakeCatalog.set(catalog);

    for (let i = 0; i < INTAKE_MAX_SELECTIONS; i++) {
      store.toggleIntakeChip(`chip-${i}`);
    }
    expect(store.selectedIntakeCount()).toBe(INTAKE_MAX_SELECTIONS);
    expect(store.canContinueIntake()).toBe(true);

    store.toggleIntakeChip(`chip-${INTAKE_MAX_SELECTIONS}`);
    expect(store.selectedIntakeCount()).toBe(INTAKE_MAX_SELECTIONS);
  });

  it('requires at least one intake chip before Continue', () => {
    expect(store.canContinueIntake()).toBe(false);
    store.toggleIntakeChip('chip-0');
    expect(store.canContinueIntake()).toBe(true);
  });
});
