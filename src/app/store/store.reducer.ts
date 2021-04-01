import {Action, createReducer} from '@ngrx/store';

export interface IState {
  playerLvl: number;
}

const initialState: IState = {
  playerLvl: 1,
};

const storeReducer = createReducer(
  initialState,
);

export function reducer(state = initialState, action: Action) {
  return storeReducer(state, action);
}
