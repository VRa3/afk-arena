import {createAction, props} from '@ngrx/store';

const actions = {
  RESOURCES_ADD_MONEY: '[RESOURCES] Add money',
  RESOURCES_DEDUCT_MONEY: '[RESOURCES] Deduct money',
};

export const addResources = createAction(actions.RESOURCES_ADD_MONEY, props<{
  gold?: number;
  experience?: number;
  magicEssence?: number;
}>());
export const deductResources = createAction(actions.RESOURCES_DEDUCT_MONEY, props<{ resourceType: string; amount: number }>());
