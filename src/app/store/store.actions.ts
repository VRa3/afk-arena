import {createAction, props} from '@ngrx/store';

const actions = {
  RESOURCES_ADD_MONEY: '[RESOURCES] Add money',
  RESOURCES_DEDUCT_MONEY: '[RESOURCES] Deduct money',
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star',
  CHARACTER_BUY: '[CHARACTER] Buy character',
  CHARACTER_LEVEL_UP: '[CHARACTER] Level up',
  APP_GIVE_RANDOM_HERO: '[APP] Give random hero'
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{ characterName: string }>());
export const buyCharacter = createAction(actions.CHARACTER_BUY, props<{ characterName: string; price: number }>());
export const levelUpCharacter = createAction(actions.CHARACTER_LEVEL_UP, props<{ characterName: string }>());
export const addRandomHeroOnInit = createAction(actions.APP_GIVE_RANDOM_HERO);
export const addResources = createAction(actions.RESOURCES_ADD_MONEY, props<{
  gold?: number;
  experience?: number;
  magicEssence?: number;
}>());
export const deductResources = createAction(actions.RESOURCES_DEDUCT_MONEY, props<{ resourceType: string; amount: number }>());
