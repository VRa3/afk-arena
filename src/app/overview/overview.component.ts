import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHero} from '../hero-card/IHero';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  heroes: IHero[] = [];
  heroesList$ = this.store.select('heroesList');
  sub: Subscription;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.sub = this.heroesList$.subscribe(heroesList => {
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
