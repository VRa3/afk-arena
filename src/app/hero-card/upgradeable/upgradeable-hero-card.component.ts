import {Component, Input, OnInit} from '@angular/core';
import {HeroCardComponent} from '../hero-card.component';
import {IResourceToManage} from '../../store/resources/resources.actions';
import {levelUpCharacter} from '../../store/heroes/heroes.actions';

@Component({
  selector: 'app-upgradeable-hero-card',
  templateUrl: './upgradeable-hero-card.component.html',
  styleUrls: ['../hero-card.component.scss'],
})
export class UpgradeableHeroCardComponent extends HeroCardComponent implements OnInit {
  @Input() upgradeable: boolean;
  canBeLeveledUp: boolean;

  get upgradeCost(): IResourceToManage[] {
    return this.heroService.getUpgradeCosts(this.hero);
  }

  ngOnInit() {
    this.canBeLeveledUp = this.hero.lvlCurrent !== this.hero.lvlCap;
  }

  levelUp() {
    this.store.dispatch(levelUpCharacter({characterName: this.hero.name}));
  }
}
