import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IHero} from './IHero';
import {Faction} from '../models/enums/faction';
import {Store} from '@ngrx/store';
import {buyCharacter, levelUpCharacter, starToggler} from '../store/store.actions';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeroCardComponent implements OnInit {
  @Input() hero: IHero;
  @Input() ableToBuy: boolean;
  @Input() upgradeable: boolean;
  @Input() shopUI: boolean;
  isStarred: boolean;
  canBeLeveledUp: boolean;
  faction = Faction;

  get currentCP() {
    return this.heroService.getCurrentCP(this.hero);
  }

  constructor(private store: Store<any>, private route: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit(): void {
    const {favorite, obtained} = this.hero;
    let currentRoute = '';

    this.route.url.subscribe(route => currentRoute = route[0].path);

    this.isStarred = favorite;
    this.canBeLeveledUp = obtained && currentRoute === 'my-team';
  }

  starToggle() {
    this.store.dispatch(starToggler({characterName: this.hero.name}));
  }

  buyCharacter() {
    this.store.dispatch(buyCharacter({characterName: this.hero.name, price: this.hero.price}));
  }

  levelUp() {
    this.store.dispatch(levelUpCharacter({characterName: this.hero.name}));
  }
}
