import {Action, createReducer, on} from '@ngrx/store';
import {addResources, deductResources} from './resources.actions';

export interface IState {
  gold: number;
  experience: number;
  magicEssence: number;
}

const initialState: IState = {
  gold: 100,
  experience: 1,
  magicEssence: 2,
};

const storeReducer = createReducer(
  initialState,
  on(addResources, (state, resourceType) => addResourceReducer(state, resourceType)),
  on(deductResources, (state, resourceType) => deductMoneyReducer(state, resourceType))
);

const addResourceReducer = (state: IState, resourceType) => {
  const resourcesObj = {
    ...state
  };

  for (const resource in resourceType) {
    if (resourceType.hasOwnProperty(resource)) {
      resourcesObj[resource] = (+resourcesObj[resource] + +resourceType[resource]).toFixed(2);
    }
  }

  return {
    ...state,
    ...resourcesObj
  };
};

const deductMoneyReducer = (state: IState, {resourceType, amount}) => {
  const deductedAmount = state[resourceType] - amount;

  return {
    ...state,
    [resourceType]: deductedAmount.toFixed(2)
  };
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
