import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  store$: Observable<any>;
  constructor(private store: Store<any>) {
  }

  countTeamCP(): number {
    this.store$ = this.store.pipe(select('store', 'heroesList'));

    const lvlModificator = 0.25;
    let amount = 0;


    const sub = this.store$.pipe(map(heroesList => {
      const obj = {};

      for (const hero in heroesList) {
        if (heroesList.hasOwnProperty(hero)) {
          if (heroesList[hero].obtained) {
            obj[hero] = heroesList[hero];
          }
        }
      }

      return obj;
    })).subscribe(data => {
      for (const hero in data) {
        if (data.hasOwnProperty(hero)) {
          const {atk, def, lvlCurrent} = data[hero];

          amount += Math.floor((lvlCurrent * lvlModificator) + (atk + def));
        }
      }
    });

    sub.unsubscribe();

    return amount;
  }

}
