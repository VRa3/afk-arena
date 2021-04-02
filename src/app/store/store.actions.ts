import {createAction} from '@ngrx/store';

const actions = {
  APP_GIVE_RANDOM_HERO: '[APP] Give random hero',
  OFFLINE_TIMER_START: '[OFFLINE TIMER] Start counting',
  OFFLINE_TIMER_RESET: '[OFFLINE TIMER] Reset counting',
};

export const addRandomHeroOnInit = createAction(actions.APP_GIVE_RANDOM_HERO);
export const startOfflineTimer = createAction(actions.OFFLINE_TIMER_START);
export const resetOfflineTimer = createAction(actions.OFFLINE_TIMER_RESET);
