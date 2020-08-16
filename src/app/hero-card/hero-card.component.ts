import {Component, Input, OnInit} from '@angular/core';
import {Ihero} from './Ihero';
import {Faction} from '../models/enums/faction';
import {Store} from '@ngrx/store';
import {starToggler} from '../store/store.actions';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Ihero;
  isStarred: boolean;
  faction = Faction;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isStarred = this.hero.favorite;
  }

  starToggle() {
    this.store.dispatch(starToggler({character: this.hero}));
  }
}
