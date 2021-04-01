import {createAction, props} from '@ngrx/store';

const actions = {
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star',
  CHARACTER_BUY: '[CHARACTER] Buy character',
  CHARACTER_LEVEL_UP: '[CHARACTER] Level up',
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{ characterName: string }>());
export const buyCharacter = createAction(actions.CHARACTER_BUY, props<{ characterName: string; price: number }>());
export const levelUpCharacter = createAction(actions.CHARACTER_LEVEL_UP, props<{ characterName: string }>());


