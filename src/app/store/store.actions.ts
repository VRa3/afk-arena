import {createAction, props} from '@ngrx/store';
import {Ihero} from '../hero-card/Ihero';

const actions = {
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star'
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{character: Ihero}>());
