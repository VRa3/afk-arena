import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Ihero} from './Ihero';
import {Faction} from '../models/enums/faction';
import {select, Store} from '@ngrx/store';
import {buyCharacter, deductMoney, starToggler} from '../store/store.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Ihero;
  @Input() ableToBuy: boolean;
  @Input() upgradeable: boolean;
  isStarred: boolean;
  faction = Faction;
  lvlModificator = 0.25;

  get currentCP() {
    const {lvlModificator} = this;
    const {atk, def, lvlCurrent} = this.hero;

    return Math.floor((lvlCurrent * lvlModificator) + (atk + def));
  }

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.isStarred = this.hero.favorite;
  }

  starToggle() {
    this.store.dispatch(starToggler({characterName: this.hero.name}));
  }

  buyCharacter() {
    this.store.dispatch(buyCharacter({characterName: this.hero.name, price: this.hero.price}));
  }
}
