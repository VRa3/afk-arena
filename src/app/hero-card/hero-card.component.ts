import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IHero} from './IHero';
import {Faction} from '../models/enums/faction';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';
import {starToggling} from './hero-card.animations';
import {buyCharacter, levelUpCharacter, starToggler} from '../store/heroes/heroes.actions';
import {AppState} from '../store/app.reducer';
import {IResourceToManage} from '../store/resources/resources.actions';

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

  get currentCP(): number {
    return this.heroService.getCurrentCP(this.hero);
  }

  get upgradeCost(): IResourceToManage[] {
    return this.heroService.getUpgradeCosts(this.hero);
  }

  get characterCostText(): string {
    return `Buy ${this.hero.name} for ${this.hero.price} golds`;
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
      this.isStarred = !this.isStarred;
  }

  buyCharacter() {
    this.store.dispatch(buyCharacter({characterName: this.hero.name, price: this.hero.price}));
  }

  levelUp() {
    this.store.dispatch(levelUpCharacter({characterName: this.hero.name}));
  }

  afterStarToggle($event) {
    if ($event.fromState === 'void' || $event.toState === 'void') {
      return;
    }

    this.store.dispatch(starToggler({characterName: this.hero.name}));
  }
}
