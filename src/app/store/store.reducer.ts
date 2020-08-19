import {Action, createReducer, on} from '@ngrx/store';
import {addRandomHeroOnInit, starToggler} from './store.actions';
import {Ihero} from '../hero-card/Ihero';
import {Faction} from '../models/enums/faction';
import {IUser} from '../models/interfaces/IUser';
import {IMoney} from '../models/interfaces/IResources';

export interface IState {
  heroesList: {};
  money: IMoney;
  playerLvl: number;
  obtainedHeroes: [];
}

const initialState: IState = {
  heroesList: {
    Lucius: {
      name: 'Lucius',
      lvlCap: 240,
      lvlCurrent: 1,
      faction: Faction.Lightbearers,
      atk: 45,
      def: 80,
      avatarURL: './assets/heroes-avatars/Lucius_avatar.jpg',
      description: `Lucius is a noble paladin of the Lightbearers faction. His main role is to protect allies with healing and powerful
      shields that can absorb enemy damage.`,
      favorite: false
    },
    Shemira: {
      name: 'Shemira',
      lvlCap: 240,
      lvlCurrent: 1,
      faction: Faction.Graveborn,
      atk: 88,
      def: 34,
      avatarURL: './assets/heroes-avatars/Shemira_avatar.jpg',
      description: `Shemira is a very powerful mage damage dealer. Her Tortured Souls ability can absolutely demolish enemy teams as not
      only does it do high damage, but it also hits every single enemy on the battlefield at the same time.`,
      favorite: false
    },
    Rowan: {
      name: 'Rowan',
      lvlCap: 240,
      lvlCurrent: 1,
      faction: Faction.Lightbearers,
      atk: 48,
      def: 56,
      avatarURL: './assets/heroes-avatars/Rowan_avatar.png',
      description: `Somewhere far away, Rowan hoisted his bag and walked one step closer to the destiny he would create for himself.`,
      favorite: false
    }
  },
  money: {
    gold: 100,
    silver: 0,
    copper: 0
  },
  playerLvl: 1,
  obtainedHeroes: []
};

const storeReducer = createReducer(
  initialState,
  on(starToggler, (state, characterName) => starCharacterReducer(state, characterName)),
  on(addRandomHeroOnInit, (state) => addRandomHeroOnInitReducer(state))
);

const starCharacterReducer = (state, {characterName}) => {
  const favoriteToggle = state.heroesList[characterName].favorite;

  return {
    ...state,
    heroesList: {
      ...state.heroesList,
      [characterName]: {
        ...state.heroesList[characterName],
        favorite: !favoriteToggle
      }
    }
  };
};

const addRandomHeroOnInitReducer = state => {
  const allHeroesNames = Object.keys(state.heroesList);
  const randomIndex = Math.floor(Math.random() * allHeroesNames.length);
  const key = allHeroesNames[randomIndex];

  return {
    ...state,
    obtainedHeroes: [state.heroesList[key]]
  };
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
