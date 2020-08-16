import { Component, OnInit } from '@angular/core';
import {Ihero} from '../hero-card/Ihero';
import {Faction} from '../models/enums/faction';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  heroes: Ihero[] = [
    {
      name: 'Lucius',
      lvlCap: 240,
      faction: Faction.Lightbearers,
      atk: 45,
      def: 80,
      avatarURL: './assets/heroes-avatars/Lucius_avatar.jpg',
      description: `Lucius is a noble paladin of the Lightbearers faction. His main role is to protect allies with healing and powerful
      shields that can absorb enemy damage.`,
    },
    {
      name: 'Shemira',
      lvlCap: 240,
      faction: Faction.Graveborn,
      atk: 88,
      def: 34,
      avatarURL: './assets/heroes-avatars/Shemira_avatar.jpg',
      description: `Shemira is a very powerful mage damage dealer. Her Tortured Souls ability can absolutely demolish enemy teams as not
      only does it do high damage, but it also hits every single enemy on the battlefield at the same time.`,
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
