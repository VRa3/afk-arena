import {Component} from '@angular/core';
import {starToggling} from '../hero-card.animations';
import {HeroCardComponent} from '../hero-card.component';

@Component({
  selector: 'app-overview-hero-card',
  templateUrl: './overview-hero-card.component.html',
  styleUrls: ['../hero-card.component.scss'],
  animations: starToggling
})
export class OverviewHeroCardComponent extends HeroCardComponent {
}
