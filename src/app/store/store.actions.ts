import {createAction} from '@ngrx/store';

const actions = {
  STAR_CHARACTER: 'STAR CHARACTER'
};

export const starCharacter = createAction(actions.STAR_CHARACTER);
