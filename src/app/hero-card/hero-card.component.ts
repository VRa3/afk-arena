import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IHero} from './IHero';
import {Faction} from '../models/enums/faction';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';
import {starToggling} from './hero-card.animations';
import {buyCharacter, levelUpCharacter, starToggler} from '../store/heroes/heroes.actions';
import {AppState} from '../store/app.reducer';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: starToggling
})
export class HeroCardComponent implements OnInit {
  @Input() hero: IHero;
  @Input() ableToBuy: boolean;
  @Input() upgradeable: boolean;
  @Input() shopUI: boolean;
  isStarred: boolean;
  canBeLeveledUp: boolean;
  faction = Faction;
  isAnimating = false;
  animationTimeout: number;

  get currentCP() {
    return this.heroService.getCurrentCP(this.hero);
  }

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private heroService: HeroService) {
  }

  ngOnInit(): void {
    const {favorite, obtained} = this.hero;
    let currentRoute = '';

    this.route.url.subscribe(route => currentRoute = route[0].path);

    this.isStarred = favorite;
    this.canBeLeveledUp = obtained && currentRoute === 'my-team';
  }

  starToggle() {
    if (!this.isAnimating) {
      this.isStarred = !this.isStarred;
      this.isAnimating = true;

      this.animationTimeout = window.setTimeout(() => {
        this.store.dispatch(starToggler({characterName: this.hero.name}));
        this.isAnimating = false;
      }, 500);
    }
  }

  buyCharacter() {
    this.store.dispatch(buyCharacter({characterName: this.hero.name, price: this.hero.price}));
  }

  levelUp() {
    this.store.dispatch(levelUpCharacter({characterName: this.hero.name}));
  }
}
