import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, State} from '@ngrx/store';
import {IState} from '../store/store.reducer';
import {Ihero} from '../hero-card/Ihero';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  heroes: Ihero[] = [];
  store$: Observable<IState>;
  sub: Subscription;

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
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
