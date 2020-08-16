import {Action, createReducer, on} from '@ngrx/store';
import {starToggler} from './store.actions';
import {Ihero} from '../hero-card/Ihero';
import {Faction} from '../models/enums/faction';

export interface IState {
  heroesList: Ihero[];
}

const initialState: IState = {
  heroesList: [
    {
      name: 'Lucius',
      lvlCap: 240,
      faction: Faction.Lightbearers,
      atk: 45,
      def: 80,
      avatarURL: './assets/heroes-avatars/Lucius_avatar.jpg',
      description: `Lucius is a noble paladin of the Lightbearers faction. His main role is to protect allies with healing and powerful
      shields that can absorb enemy damage.`,
      favorite: false
    },
    {
      name: 'Shemira',
      lvlCap: 240,
      faction: Faction.Graveborn,
      atk: 88,
      def: 34,
      avatarURL: './assets/heroes-avatars/Shemira_avatar.jpg',
      description: `Shemira is a very powerful mage damage dealer. Her Tortured Souls ability can absolutely demolish enemy teams as not
      only does it do high damage, but it also hits every single enemy on the battlefield at the same time.`,
      favorite: false
    },
    {
      name: 'Rowan',
      lvlCap: 240,
      faction: Faction.Lightbearers,
      atk: 48,
      def: 56,
      avatarURL: './assets/heroes-avatars/Rowan_avatar.png',
      description: `Somewhere far away, Rowan hoisted his bag and walked one step closer to the destiny he would create for himself.`,
      favorite: false
    }
  ]
};

const storeReducer = createReducer(
  initialState,
  on(starToggler, (state, character) => starCharacterReducer(state, character))
);

const starCharacterReducer = (state, {character}) => {
  const heroesArray = state.heroesList.map(hero => {
    if (hero.name === character.name) {
      return {...hero, favorite: true};
    }

    return {...hero};
  });

  return {
    ...state,
    heroesList: heroesArray
  };
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
