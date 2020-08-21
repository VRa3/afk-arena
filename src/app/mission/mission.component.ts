import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

// You can start mission here. By comparing team CP and enemy CP winner is selected.
// Fight lasts maximally 30 seconds. Bigger advantage = shorter fight time.
// After win, player is rewarded with resources.
// AFK rewards are collected here.

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  teamCP: number;
  enemyCP = 100;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.teamCP = this.appService.countTeamCP();
  }

  startFight() {
    this.teamCP > this.enemyCP
      ? console.log('Wygrałeś')
      : console.log('Przegrałeś');
  }
}
