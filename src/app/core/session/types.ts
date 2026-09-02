export interface FocusArea {
  id: string;
  name: string;
  description: string;
}

export interface IntakeChip {
  id: string;
  text: string;
  selected: boolean;
}

export type StageType = 'cue' | 'environment' | 'friction';

export interface AsIsStage {
  type: StageType;
  content: string;
}

export interface Bottleneck {
  stage: StageType;
  content: string;
  reason: string;
}

export interface Outcome {
  what: string;
  why: string;
}

export interface ToBeStage {
  type: StageType;
  content: string;
}

export interface DailyCheckIn {
  day: number;
  date: string;
  completed: boolean | null;
}

export interface DesignSession {
  focusArea: FocusArea | null;
  intakeChips: IntakeChip[];
  asIsLoop: AsIsStage[];
  bottleneck: Bottleneck | null;
  outcome: Outcome | null;
  toBeLoop: ToBeStage[];
  dailyCheckIns: DailyCheckIn[];
}
