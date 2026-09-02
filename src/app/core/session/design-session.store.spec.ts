import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DesignSessionStore } from './design-session.store';

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
});
