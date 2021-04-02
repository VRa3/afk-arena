import {createAction, props} from '@ngrx/store';

export interface IResourceToManage {
  resourceType: string;
  amount: number;
}

const actions = {
  RESOURCES_ADD_MONEY: '[RESOURCES] Add money',
  RESOURCES_DEDUCT_SINGLE: '[RESOURCES] Deduct single',
  RESOURCES_DEDUCT_MULTIPLE: '[RESOURCES] Deduct multiple',
};

export const addResources = createAction(actions.RESOURCES_ADD_MONEY, props<{
  gold?: number;
  experience?: number;
  magicEssence?: number;
}>());
export const deductResource = createAction(actions.RESOURCES_DEDUCT_SINGLE, props<IResourceToManage>());
export const deductResources = createAction(actions.RESOURCES_DEDUCT_MULTIPLE, props<{resources: IResourceToManage[]}>());
