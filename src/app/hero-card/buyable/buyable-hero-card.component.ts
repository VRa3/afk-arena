import {Component, Input} from '@angular/core';
import {HeroCardComponent} from '../hero-card.component';
import {buyCharacter} from '../../store/heroes/heroes.actions';

@Component({
  selector: 'app-buyable-hero-card',
  templateUrl: './buyable-hero-card.component.html',
  styleUrls: ['../hero-card.component.scss'],
})
export class BuyableHeroCardComponent extends HeroCardComponent {
  @Input() ableToBuy: boolean;

  get characterCostText(): string {
    return `Buy ${this.hero.name} for ${this.hero.price} golds`;
  }

  buyCharacter() {
    this.store.dispatch(buyCharacter({characterName: this.hero.name, price: this.hero.price}));
  }
}
