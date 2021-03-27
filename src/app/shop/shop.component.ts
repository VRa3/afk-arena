import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, State} from '@ngrx/store';
import {IState} from '../store/store.reducer';
import {IHero} from '../hero-card/IHero';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  heroes: IHero[] = [];
  store$: Observable<IState>;
  sub: Subscription;
  playerMoney: number = null;

  constructor(private store: State<IState>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.sub = this.store$.subscribe(store => {
      const {heroesList} = store;
      const heroesArray = [];

      for (const hero in heroesList) {
        if (heroesList.hasOwnProperty(hero)) {
          if (heroesList[hero].obtained !== true) {
            heroesArray.push(heroesList[hero]);
          }
        }
      }

      this.heroes = heroesArray;
      this.playerMoney = store.resources.gold;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
