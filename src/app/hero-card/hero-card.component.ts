import {Component, Input, OnInit} from '@angular/core';
import {IHero} from './IHero';
import {Faction} from '../models/enums/faction';
import {Store} from '@ngrx/store';
import {HeroService} from './hero.service';
import {starToggling} from './hero-card.animations';
import {starToggler} from '../store/heroes/heroes.actions';
import {AppState} from '../store/app.reducer';

@Component({
  selector: 'app-hero-card-base',
  template: '<div>app-hero-card-base class</div>',
  animations: starToggling
})
export abstract class HeroCardComponent implements OnInit {
  @Input() hero: IHero;
  @Input() ableToBuy: boolean;
  @Input() upgradeable: boolean;
  @Input() shopUI: boolean;
  isStarred: boolean;
  canBeLeveledUp: boolean;
  faction = Faction;

  get currentCP(): number {
    return this.heroService.getCurrentCP(this.hero);
  }

  constructor(protected store: Store<AppState>,
              protected heroService: HeroService) {
  }

  ngOnInit(): void {
    const {favorite, obtained} = this.hero;
    this.isStarred = favorite;
    this.canBeLeveledUp = obtained && !this.shopUI && (this.hero.lvlCurrent !== this.hero.lvlCap);
  }

  starToggle() {
    this.isStarred = !this.isStarred;
  }

  afterStarToggle($event) {
    if ($event.fromState === 'void' || $event.toState === 'void') {
      return;
    }

    this.store.dispatch(starToggler({characterName: this.hero.name}));
  }
}
