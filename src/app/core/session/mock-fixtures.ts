import { DesignSession, FocusArea } from './types';

export const FOCUS_AREAS: FocusArea[] = [
  { id: 'morning-energy', name: 'Morning energy', description: 'Build sustainable morning momentum' },
  { id: 'deep-work', name: 'Deep Work', description: 'Protect focused work sessions' },
  { id: 'exercise', name: 'Exercise', description: 'Establish consistent movement' }
];

export const MORNING_ENERGY_FIXTURE: DesignSession = {
  focusArea: FOCUS_AREAS[0],
  intakeChips: [],
  asIsLoop: [
    {
      id: 'asis-1',
      type: 'cue',
      title: 'Alarm rings',
      body: '6:45am phone alarm on nightstand. First sound of the day.'
    },
    {
      id: 'asis-2',
      type: 'environment',
      title: 'Phone within reach',
      body: 'Dark room, curtains closed. Phone is the closest object.'
    },
    {
      id: 'asis-3',
      type: 'friction',
      title: 'Snooze + scroll',
      body: 'Hit snooze, open social feeds. 20–40 min lost before feet hit floor.'
    },
    {
      id: 'asis-4',
      type: 'cue',
      title: 'Bladder / light hunger',
      body: 'Secondary bodily cue that eventually forces getting up.'
    },
    {
      id: 'asis-5',
      type: 'environment',
      title: 'Kitchen path unclear',
      body: 'No water glass staged. Kitchen lights off — extra decisions.'
    }
  ],
  bottleneck: {
    stageId: 'asis-3',
    stage: 'friction',
    title: 'Snooze + scroll',
    reason: 'Highest stall: delay compounds before any positive action.'
  },
  outcome: {
    statement:
      'Within 7 days: out of bed within 5 minutes of the first alarm, phone stays face-down until water and light.',
    bottleneckNote: 'Bottleneck addressed: Snooze + scroll (Friction) — confirmed in Human Calibration.'
  },
  toBeLoop: [
    {
      id: 'tobe-1',
      type: 'cue',
      title: 'Alarm across the room',
      body: 'Alarm on dresser — must stand to silence.',
      intervention: '+ Distance the cue'
    },
    {
      id: 'tobe-2',
      type: 'environment',
      title: 'Water + open curtains',
      body: 'Glass staged night before; daylight first.',
      intervention: '+ Prep the path'
    },
    {
      id: 'tobe-3',
      type: 'friction',
      title: 'Phone stays face-down',
      body: 'No unlock until after water + light ritual.',
      intervention: '+ Block the stall'
    },
    {
      id: 'tobe-4',
      type: 'cue',
      title: 'Kitchen kettle click',
      body: 'Boil water as next automatic step.',
      intervention: '+ Chain cue'
    },
    {
      id: 'tobe-5',
      type: 'environment',
      title: 'Bright kitchen ready',
      body: 'Lights on timer; path friction removed.'
    }
  ],
  dailyCheckIns: [
    { day: 1, weekday: 'Mon', completed: true, deferred: false },
    { day: 2, weekday: 'Tue', completed: true, deferred: false },
    { day: 3, weekday: 'Wed', completed: false, deferred: false },
    { day: 4, weekday: 'Thu', completed: null, deferred: false },
    { day: 5, weekday: 'Fri', completed: null, deferred: false },
    { day: 6, weekday: 'Sat', completed: null, deferred: false },
    { day: 7, weekday: 'Sun', completed: null, deferred: true }
  ],
  todayDay: 4
};
