import {Component, Input, OnInit} from '@angular/core';
import {Ascension} from '../../models/enums/ascension';

@Component({
  selector: 'app-ascension-badge',
  templateUrl: './ascension-badge.component.html',
  styleUrls: ['./ascension-badge.component.scss']
})
export class AscensionBadgeComponent implements OnInit {
  @Input() ascensionLvl: Ascension;
  imgSrc = '../../../assets/ascension-badges/rare_plus.jpg';

  constructor() {
  }

  ngOnInit(): void {
    this.imgSrc = `../../../assets/ascension-badges/${Ascension[this.ascensionLvl]}.jpg`;
  }
}
