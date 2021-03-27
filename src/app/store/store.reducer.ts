import {Action, createReducer, on} from '@ngrx/store';
import {addResources, addRandomHeroOnInit, buyCharacter, deductResources, starToggler, levelUpCharacter} from './store.actions';
import {IHero} from '../hero-card/IHero';
import {Faction} from '../models/enums/faction';
import {IResources} from '../models/interfaces/IResources';
import {Ascension} from '../models/enums/ascension';

export interface IState {
  heroesList: {
    [key: string]: IHero
  };
  playerLvl: number;
  resources: IResources;
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
      price: 9,
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
      price: 9,
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
      price: 150,
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
      price: 9,
      ascensionLvl: Ascension.elite
    }
  },
  playerLvl: 1,
  resources: {
    gold: 100,
    experience: 1,
    magicEssence: 2,
  }
};

const storeReducer = createReducer(
  initialState,
  on(starToggler, (state, characterName) => starCharacterReducer(state, characterName)),
  on(buyCharacter, (state, characterName) => buyCharacterReducer(state, characterName)),
  on(levelUpCharacter, (state, characterName) => levelUpCharacterReducer(state, characterName)),
  on(addRandomHeroOnInit, (state) => addRandomHeroOnInitReducer(state)),
  on(addResources, (state, resourceType) => addResourceReducer(state, resourceType)),
  on(deductResources, (state, resourceType) => deductMoneyReducer(state, resourceType))
);

const starCharacterReducer = (state: IState, {characterName}) => {
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

const addRandomHeroOnInitReducer = (state: IState) => {
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

const addResourceReducer = (state: IState, resourceType) => {
  const resourcesObj = {
    ...state.resources
  };

  for (const resource in resourceType) {
    if (resourceType.hasOwnProperty(resource)) {
      resourcesObj[resource] = (+resourcesObj[resource] + +resourceType[resource]).toFixed(2);
    }
  }

  return {
    ...state,
    resources: {
      ...resourcesObj
    }
  };
};

const deductMoneyReducer = (state: IState, {resourceType, amount}) => {
  const x = state.resources[resourceType] - amount;

  return {
    ...state,
    resources: {
      ...state.resources,
      [resourceType]: x
    }
  };
};

const buyCharacterReducer = (state: IState, {characterName, price}) => {
  const resourceObj = {
    ...state.resources,
    gold: state.resources.gold - price
  };

  return {
    ...state,
    resources: resourceObj,
    heroesList: {
      ...state.heroesList,
      [characterName]: {
        ...state.heroesList[characterName],
        obtained: true
      }
    }
  };
};

const levelUpCharacterReducer = (state: IState, {characterName}) => {
  const incrementHeroLvl = state.heroesList[characterName].lvlCurrent + 1;

  const updatedHeroesList = {
    ...state.heroesList,
    [characterName]: {
      ...state.heroesList[characterName],
      lvlCurrent: incrementHeroLvl
    }
  };

  return {
    ...state,
    heroesList: updatedHeroesList
  };
};

export function reducer(state: IState | undefined, action: Action) {
  return storeReducer(state, action);
}
