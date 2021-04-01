import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IHero} from '../hero-card/IHero';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  heroes: IHero[] = [];
  heroesStore$: Observable<any> = this.store.select('heroesList');
  resourcesStore$: Observable<any> = this.store.select('resources');
  sub = new Subscription();
  playerMoney: number = null;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    const heroesSub = this.heroesStore$.subscribe(heroesList => {
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

    const resourcesSub = this.resourcesStore$.subscribe(resources => {
      this.playerMoney = resources.gold;
    });

    this.sub.add(heroesSub);
    this.sub.add(resourcesSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
