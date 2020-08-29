import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHero} from '../hero-card/IHero';
import {Observable, Subscription} from 'rxjs';
import {select, State} from '@ngrx/store';
import {IState} from '../store/store.reducer';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  heroes: IHero[] = [];
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
          heroesArray.push(heroesList[hero]);
        }
      }

      this.heroes = heroesArray;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
