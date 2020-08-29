import {createAction, props} from '@ngrx/store';
import {IHero} from '../hero-card/IHero';
import {IResources} from '../models/interfaces/IResources';

const actions = {
  RESOURCES_ADD_MONEY: '[RESOURCES] Add money',
  RESOURCES_DEDUCT_MONEY: '[RESOURCES] Deduct money',
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star',
  CHARACTER_BUY: '[CHARACTER] Buy character',
  APP_GIVE_RANDOM_HERO: '[APP] Give random hero'
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{characterName: string}>());
export const buyCharacter = createAction(actions.CHARACTER_BUY, props<{characterName: string; price: number}>());
export const addRandomHeroOnInit = createAction(actions.APP_GIVE_RANDOM_HERO);
export const addResources = createAction(actions.RESOURCES_ADD_MONEY, props<{resourceType: string; amount: number}>());
export const deductResources = createAction(actions.RESOURCES_DEDUCT_MONEY, props<{resourceType: string; amount: number}>());
