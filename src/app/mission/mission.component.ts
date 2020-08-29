import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Store} from '@ngrx/store';
import {addResources} from '../store/store.actions';
import {MissionService} from './mission.service';
import {interval, of, range} from 'rxjs';
import {delay, take, timeout} from 'rxjs/operators';

// You can start mission here. By comparing team CP and enemy CP winner is selected.
// Fight lasts maximally 30 seconds. Bigger advantage = shorter fight time.
// After win, player is rewarded with resources.
// AFK rewards are collected here.

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  providers: [MissionService]
})
export class MissionComponent implements OnInit {
  teamCP: number;
  enemyCP = 100;
  currentFight: any;
  timeAmount: number;
  timeBase: number;
  timeLeft = 0;

  get timeToEndBattle(): number {
    return this.timeLeft;
  }

  constructor(private store: Store, private appService: AppService, private missionService: MissionService) {
  }

  ngOnInit(): void {
    this.teamCP = this.appService.countTeamCP();
  }

  startFight() {
    this.timeBase = 30;
    this.currentFight = this.missionService.getFightResults(this.teamCP, this.enemyCP);
    this.timeAmount = Math.floor(this.timeBase / this.currentFight.modificator);

    this.timeLeft = this.timeAmount;
    interval(1000).pipe(take(this.timeAmount)).subscribe({
      next: data => this.timeLeft = this.timeAmount - (data + 1),
      complete: () => {
        this.timeLeft = null;
        this.store.dispatch(addResources({resourceType: 'gold', amount: 44}));
      }
    });
  }

  collectAFKMoney() {
    this.store.dispatch(addResources({resourceType: 'gold', amount: 12}));
  }
}
