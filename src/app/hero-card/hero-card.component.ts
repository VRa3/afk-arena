import {Component, Input, OnInit} from '@angular/core';
import {Ihero} from './Ihero';
import {Faction} from '../models/enums/faction';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Ihero;
  isStarred = false;
  faction = Faction;

  constructor() {
    console.log('ehh');
  }

  ngOnInit(): void {
    console.log('ehhh');
  }

  starToggle() {
    this.isStarred = !this.isStarred;
  }
}
