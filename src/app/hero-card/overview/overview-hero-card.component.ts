import {Component} from '@angular/core';
import {HeroCardComponent} from '../hero-card.component';

@Component({
  selector: 'app-overview-hero-card',
  templateUrl: './overview-hero-card.component.html',
  styleUrls: ['../hero-card.component.scss'],
})
export class OverviewHeroCardComponent extends HeroCardComponent {
}
