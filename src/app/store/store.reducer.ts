import {Action, createReducer, on} from '@ngrx/store';
import {addMoney, addRandomHeroOnInit, buyCharacter, deductMoney, starToggler} from './store.actions';
import {Ihero} from '../hero-card/Ihero';
import {Faction} from '../models/enums/faction';
import {IUser} from '../models/interfaces/IUser';
import {IMoney} from '../models/interfaces/IResources';
import {Ascension} from '../models/enums/ascension';

export interface IState {
  heroesList: {};
  money: IMoney;
  playerLvl: number;
}

const initialState: IState = {
  heroesList: {
    Angelo: {
      name: 'Angelo',
      lvlCap: 120,
      lvlCurrent: 1,
      faction: Faction.Lightbearers,
      atk: 21,
      def: 18,
      avatarURL: './assets/heroes-avatars/Angelo_avatar.jpg',
      description: `For Angelo, music and verse are his very heartbeat. Poetry and prose are the breath from his lips, and beauty in all its
      forms is the meaning of life. His musical gifts are such that the people say he was granted them by The Light Itself.`,
      favorite: false,
      price: {
        gold: 9,
        silver: 0,
        copper: 0
      },
      ascensionLvl: Ascension.rare
    },
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
      favorite: false,
      price: {
        gold: 9,
        silver: 0,
        copper: 0
      },
      ascensionLvl: Ascension.elite
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
      favorite: false,
      price: {
        gold: 9,
        silver: 0,
        copper: 0
      },
      ascensionLvl: Ascension.elite
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
      favorite: false,
      price: {
        gold: 9,
        silver: 0,
        copper: 0
      },
      ascensionLvl: Ascension.elite
    }
  },
  money: {
    gold: 100,
    silver: 0,
    copper: 0
  },
  playerLvl: 1,
};

const storeReducer = createReducer(
  initialState,
  on(starToggler, (state, characterName) => starCharacterReducer(state, characterName)),
  on(buyCharacter, (state, characterName) => buyCharacterReducer(state, characterName)),
  on(addRandomHeroOnInit, (state) => addRandomHeroOnInitReducer(state)),
  on(addMoney, (state, moneyType) => addMoneyReducer(state, moneyType)),
  on(deductMoney, (state, moneyType) => deductMoneyReducer(state, moneyType))
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
  const characterName = allHeroesNames[randomIndex];
  const obtainedToggle = !!state.heroesList[characterName].obtained;

  return {
    ...state,
    heroesList: {
      ...state.heroesList,
      [characterName]: {
        ...state.heroesList[characterName],
        obtained: !obtainedToggle
      }
    }
  };
};

const addMoneyReducer = (state, {moneyType, amount}) => {
  const x = state.money[moneyType] + amount;

  return {
    ...state,
    money: {
      ...state.money,
      [moneyType]: x
    }
  };
};

const deductMoneyReducer = (state, {moneyType, amount}) => {
  const x = state.money[moneyType] - amount;

  return {
    ...state,
    money: {
      ...state.money,
      [moneyType]: x
    }
  };
};

const buyCharacterReducer = (state, {characterName, price}) => {
  const moneyObject = Object.keys(state.money).reduce((acc, curr) => {
    acc[curr] = state.money[curr] - price[curr];
    return acc;
  }, {});

  return {
    ...state,
    money: moneyObject,
    heroesList: {
      ...state.heroesList,
      [characterName]: {
        ...state.heroesList[characterName],
        obtained: true
      }
    }
  };
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
