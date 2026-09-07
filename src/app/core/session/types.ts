export interface FocusArea {
  id: string;
  name: string;
  description: string;
}

export type IntakeChipGroup = 'energy' | 'device' | 'attention' | 'food' | 'time' | 'environment';

export interface IntakeChipCatalogItem {
  id: string;
  label: string;
  group: IntakeChipGroup;
  sortOrder: number;
  focusAreaId: string;
  intakeKind: string;
}

export interface IntakeChip {
  id: string;
  text: string;
  selected: boolean;
}

export type StageType = 'cue' | 'environment' | 'friction';

export interface LoopStage {
  id: string;
  type: StageType;
  title: string;
  body: string;
  intervention?: string;
}

export type AsIsStage = LoopStage;
export type ToBeStage = LoopStage;

export interface Bottleneck {
  stageId: string;
  stage: StageType;
  title: string;
  reason: string;
}

export interface Outcome {
  statement: string;
  bottleneckNote: string;
}

export interface DailyCheckIn {
  day: number;
  weekday: string;
  completed: boolean | null;
  deferred: boolean;
}

export interface DesignSession {
  focusArea: FocusArea | null;
  intakeChips: IntakeChip[];
  asIsLoop: AsIsStage[];
  bottleneck: Bottleneck | null;
  outcome: Outcome | null;
  toBeLoop: ToBeStage[];
  dailyCheckIns: DailyCheckIn[];
  todayDay: number;
}
