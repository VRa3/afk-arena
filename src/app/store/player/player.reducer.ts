import {Action, createReducer} from '@ngrx/store';

export interface IState {
  lvl: number;
  clickPower: number;
}

const initialState: IState = {
  lvl: 1,
  clickPower: 1
};

const storeReducer = createReducer(
  initialState,
);

export function reducer(state = initialState, action: Action) {
  return storeReducer(state, action);
}
