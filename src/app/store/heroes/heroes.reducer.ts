import {Faction} from '../../models/enums/faction';
import {Ascension} from '../../models/enums/ascension';
import {Action, createReducer, on} from '@ngrx/store';
import {addRandomHeroOnInit} from '../store.actions';
import {IHero} from '../../hero-card/IHero';
import {buyCharacter, levelUpCharacter, starToggler} from './heroes.actions';
import {Heroes} from '../../models/enums/heroes';

export type IState = {
  [key in keyof typeof Heroes]: IHero
};

const initialState: IState = {
  Angelo: {
    name: 'Angelo',
    lvlCap: 20,
    hardLvlCap: 120,
    lvlCurrent: 1,
    faction: Faction.Lightbearers,
    atk: 21,
    def: 18,
    avatarURL: './assets/heroes-avatars/Angelo_avatar.jpg',
    description: `For Angelo, music and verse are his very heartbeat. Poetry and prose are the breath from his lips, and beauty in all its
      forms is the meaning of life. His musical gifts are such that the people say he was granted them by The Light Itself.`,
    favorite: false,
    price: 9,
    ascensionLvl: Ascension.rare
  },
  Lucius: {
    name: 'Lucius',
    lvlCap: 20,
    hardLvlCap: 240,
    lvlCurrent: 1,
    faction: Faction.Lightbearers,
    atk: 45,
    def: 80,
    avatarURL: './assets/heroes-avatars/Lucius_avatar.jpg',
    description: `Lucius is a noble paladin of the Lightbearers faction. His main role is to protect allies with healing and powerful
      shields that can absorb enemy damage.`,
    favorite: false,
    price: 9,
    ascensionLvl: Ascension.elite
  },
  Shemira: {
    name: 'Shemira',
    lvlCap: 20,
    hardLvlCap: 240,
    lvlCurrent: 1,
    faction: Faction.Graveborn,
    atk: 88,
    def: 34,
    avatarURL: './assets/heroes-avatars/Shemira_avatar.jpg',
    description: `Shemira is a very powerful mage damage dealer. Her Tortured Souls ability can absolutely demolish enemy teams as not
      only does it do high damage, but it also hits every single enemy on the battlefield at the same time.`,
    favorite: false,
    price: 150,
    ascensionLvl: Ascension.elite
  },
  Rowan: {
    name: 'Rowan',
    lvlCap: 20,
    hardLvlCap: 240,
    lvlCurrent: 1,
    faction: Faction.Lightbearers,
    atk: 48,
    def: 56,
    avatarURL: './assets/heroes-avatars/Rowan_avatar.png',
    description: `Somewhere far away, Rowan hoisted his bag and walked one step closer to the destiny he would create for himself.`,
    favorite: false,
    price: 9,
    ascensionLvl: Ascension.elite
  }
};

const storeReducer = createReducer(
  initialState,
  on(addRandomHeroOnInit, (state) => addRandomHeroOnInitReducer(state)),
  on(starToggler, ((state, characterName) => starCharacterReducer(state, characterName))),
  on(buyCharacter, ((state, data) => buyCharacterReducer(state, data))),
  on(levelUpCharacter, ((state, characterName) => levelUpCharacterReducer(state, characterName)))
);

const addRandomHeroOnInitReducer = (state: IState) => {
  const allHeroesNames = Object.keys(state);
  const randomIndex = Math.floor(Math.random() * allHeroesNames.length);
  const characterName = allHeroesNames[randomIndex];
  const obtainedToggle = !!state[characterName].obtained;

  return {
    ...state,
    [characterName]: {
      ...state[characterName],
      obtained: !obtainedToggle
    }
  };
};

const starCharacterReducer = (state: IState, {characterName}) => {
  const favoriteToggle = state[characterName].favorite;

  return {
    ...state,
    [characterName]: {
      ...state[characterName],
      favorite: !favoriteToggle
    }
  };
};

const buyCharacterReducer = (state: IState, {characterName}) => {
  return {
    ...state,
    [characterName]: {
      ...state[characterName],
      obtained: true
    }
  };
};

const levelUpCharacterReducer = (state: IState, {characterName}) => {
  const incrementHeroLvl = state[characterName].lvlCurrent + 1;

  return {
    ...state,
    [characterName]: {
      ...state[characterName],
      lvlCurrent: incrementHeroLvl
    }
  };
};

export function reducer(state = initialState, action: Action) {
  return storeReducer(state, action);
}
