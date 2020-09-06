import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  lvlModificator = 1;

  constructor() {
  }

  getCurrentCP(hero) {
    const {lvlModificator} = this;
    const {atk, def, lvlCurrent} = hero;

    return Math.floor((lvlCurrent * lvlModificator) * (atk + def));
  }
}
