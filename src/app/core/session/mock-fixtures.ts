import { FocusArea, IntakeChip, AsIsStage, Bottleneck, Outcome, ToBeStage, DailyCheckIn } from './types';

export const FOCUS_AREAS: FocusArea[] = [
  { id: 'morning-energy', name: 'Morning Energy', description: 'Build sustainable morning momentum' },
  { id: 'deep-work', name: 'Deep Work', description: 'Protect focused work sessions' },
  { id: 'exercise', name: 'Exercise', description: 'Establish consistent movement' }
];

export const MORNING_ENERGY_FIXTURE = {
  focusArea: FOCUS_AREAS[0],
  intakeChips: [
    { id: '1', text: 'Waking up groggy', selected: true },
    { id: '2', text: 'Scattered mornings', selected: true },
    { id: '3', text: 'Phone first thing', selected: true },
    { id: '4', text: 'No breakfast routine', selected: false },
    { id: '5', text: 'Late to meetings', selected: false }
  ],
  asIsLoop: [
    { type: 'cue' as const, content: 'Alarm goes off at 7am' },
    { type: 'environment' as const, content: 'Phone on nightstand, dark room' },
    { type: 'friction' as const, content: 'Hit snooze 3 times, scroll phone in bed for 20 min' }
  ],
  bottleneck: {
    stage: 'friction' as const,
    content: 'Hit snooze 3 times, scroll phone in bed for 20 min',
    reason: 'Phone accessibility + no energy anchor'
  },
  outcome: {
    what: 'Start the day with energy and intention',
    why: 'Feel present and focused in morning meetings'
  },
  toBeLoop: [
    { type: 'cue' as const, content: 'Alarm goes off at 7am' },
    { type: 'environment' as const, content: 'Phone across room, water + journal on desk' },
    { type: 'friction' as const, content: 'Get up immediately, drink water, 5-min journal' }
  ],
  dailyCheckIns: Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    completed: i === 0 ? null : null
  }))
};
