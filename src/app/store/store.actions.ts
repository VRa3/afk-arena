import {createAction, props} from '@ngrx/store';
import {Ihero} from '../hero-card/Ihero';
import {IMoney} from '../models/interfaces/IResources';

const actions = {
  RESOURCES_ADD_MONEY: '[RESOURCES] Add money',
  RESOURCES_DEDUCT_MONEY: '[RESOURCES] Deduct money',
  CHARACTER_STAR_TOGGLE: '[CHARACTER] Toggle star',
  CHARACTER_BUY: '[CHARACTER] Buy character',
  APP_GIVE_RANDOM_HERO: '[APP] Give random hero'
};

export const starToggler = createAction(actions.CHARACTER_STAR_TOGGLE, props<{characterName: string}>());
export const buyCharacter = createAction(actions.CHARACTER_BUY, props<{characterName: string; price: IMoney}>());
export const addRandomHeroOnInit = createAction(actions.APP_GIVE_RANDOM_HERO);
export const addMoney = createAction(actions.RESOURCES_ADD_MONEY, props<{moneyType: string; amount: number}>());
export const deductMoney = createAction(actions.RESOURCES_DEDUCT_MONEY, props<{moneyType: string; amount: number}>());
