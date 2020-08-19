import {createAction, props} from '@ngrx/store';
import {Ihero} from '../hero-card/Ihero';

const actions = {
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star',
  APP_GIVE_RANDOM_HERO: '[APP] Give random hero'
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{characterName: string}>());
export const addRandomHeroOnInit = createAction(actions.APP_GIVE_RANDOM_HERO);
