import {ActionReducerMap} from '@ngrx/store';

import * as fromHeroesList from './heroes/heroes.reducer';
import * as fromResources from './resources/resources.reducer';
import * as fromStore from './store.reducer';

export interface AppState {
  heroesList: fromHeroesList.IState;
  resources: fromResources.IState;
  store: fromStore.IState;
}

export const appReducer: ActionReducerMap<AppState> = {
  heroesList: fromHeroesList.reducer,
  resources: fromResources.reducer,
  store: fromStore.reducer
};
