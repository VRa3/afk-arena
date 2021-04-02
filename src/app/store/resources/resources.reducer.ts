import {Action, createReducer, on} from '@ngrx/store';
import {addResources, deductResource, deductResources} from './resources.actions';

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
  on(deductResource, (state, resourceType) => deductMoneyReducer(state, resourceType)),
  on(deductResources, (state, resources) => deductMultipleResourcesReducer(state, resources))
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

  return resourcesObj;
};

const deductMoneyReducer = (state: IState, {resourceType, amount}) => {
  const deductedAmount = state[resourceType] - amount;

  return {
    ...state,
    [resourceType]: deductedAmount.toFixed(2)
  };
};

const deductMultipleResourcesReducer = (state: IState, {resources}) => {
  const resourcesObj = {
    ...state
  };

  for (const resource of resources) {
    resourcesObj[resource.resourceType] = resourcesObj[resource.resourceType] - resource.amount;
  }

  return resourcesObj;
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
