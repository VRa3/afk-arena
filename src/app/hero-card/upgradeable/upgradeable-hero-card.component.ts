import {Component} from '@angular/core';
import {starToggling} from '../hero-card.animations';
import {HeroCardComponent} from '../hero-card.component';

@Component({
  selector: 'app-upgradeable-hero-card',
  templateUrl: './upgradeable-hero-card.component.html',
  styleUrls: ['../hero-card.component.scss'],
  animations: starToggling
})
export class UpgradeableHeroCardComponent extends HeroCardComponent {
}
