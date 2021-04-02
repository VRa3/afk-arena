import {Injectable} from '@angular/core';
import {IHero} from './IHero';
import {IResourceToManage} from '../store/resources/resources.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  lvlModificator = 1;

  constructor() {
  }

  getCurrentCP(hero: IHero, deductLvl = false): number {
    const {lvlModificator} = this;
    const {atk, def} = hero;
    let {lvlCurrent} = hero;

    if (deductLvl) {
      lvlCurrent--;
    }

    return Math.floor((lvlCurrent * lvlModificator) * (atk + def));
  }

  getUpgradeCosts(hero, deductLvl = false): IResourceToManage[] {
    const formula = this.getCurrentCP(hero, deductLvl);

    return [
      {
        resourceType: 'gold',
        amount: formula * 0.5
      },
      {
        resourceType: 'magicEssence',
        amount: formula * 0.25
      }
    ];
  }
}
