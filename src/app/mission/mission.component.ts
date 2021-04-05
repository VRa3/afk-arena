import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Store} from '@ngrx/store';
import {resetOfflineTimer} from '../store/store.actions';
import {MissionService} from './mission.service';
import {interval, Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {addResources} from '../store/resources/resources.actions';
import {AppState} from '../store/app.reducer';

// You can start mission here. By comparing team CP and enemy CP winner is selected.
// Fight lasts maximally 30 seconds. Bigger advantage = shorter fight time.
// After win, player is rewarded with resources.
// AFK rewards are collected here.

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit, OnDestroy {
  teamCP: number;
  enemyCP: number;
  timeToEndBattle: number;
  currentChapter: number;
  stages: number[];
  rewards: any;
  hasMoreChapters = true;
  isAbleToCollectAfkMoney: boolean;
  subManager = new Subscription();
  battleEnded$ = new Subject<any>();
  fightProgress: number;

  constructor(private store: Store<AppState>,
              private appService: AppService,
              private missionService: MissionService) {
  }

  ngOnInit(): void {
    this.appService.teamCP$.subscribe(teamPower => this.teamCP = teamPower);

    this.missionService.generateStagesAndRewards();

    const currentStageSub = this.appService.currentStage$.subscribe(currentChapter => {
      if (currentChapter) {
        this.currentChapter = currentChapter;
        this.enemyCP = this.missionService.rewards.stages[currentChapter];
      } else {
        this.hasMoreChapters = false;
      }
    });

    this.isAbleToCollectAfkMoney = this.getOfflineTimeInSeconds() > 15;

    this.subManager.add(currentStageSub);
  }

  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }

  startFight(): void {
    if (this.timeToEndBattle > 0) {
      return;
    }

    this.countFightResults();

    interval(100).pipe(takeUntil(this.battleEnded$)).subscribe({
      next: () => this.countdownWhileBattling(),
      complete: () => {
        this.timeToEndBattle = null;

        if (this.fightProgress >= 1) {
          this.appService.advancePlayerToNextStage();
          this.missionService.giveRewards(this.currentChapter);
          return;
        }

        this.missionService.giveSmallRewards(this.currentChapter);
      }
    });
  }

  countFightResults(): void {
    const winChance = this.missionService.getWinChance(this.teamCP, this.enemyCP);

    winChance <= 1
      ? this.timeToEndBattle = this.missionService.missionBaseTime
      : this.timeToEndBattle = Math.floor(this.missionService.missionBaseTime / winChance);
    this.fightProgress = winChance;
  }

  countdownWhileBattling(): void {
    this.timeToEndBattle = +(this.timeToEndBattle - 0.1).toFixed(2);
    if (this.timeToEndBattle <= 0) {
      this.battleEnded$.next(true);
    }
  }

  collectAFKMoney(): void {
    const multiplier = +(this.getOfflineTimeInSeconds() / 3600).toFixed(2);
    this.isAbleToCollectAfkMoney = false;
    interval(15000).pipe(take(1)).subscribe(() => this.isAbleToCollectAfkMoney = true);

    this.missionService.giveSmallRewards(this.currentChapter, multiplier);
    this.store.dispatch(resetOfflineTimer());
  }

  getOfflineTimeInSeconds(): number {
    const now = Date.now();
    const offlineStart = +localStorage.getItem('offlineStart');
    return Math.round((now - offlineStart) / 1000);
  }

  onTeamHelp() {
    let playerClickPower = null;
    this.store.select('player').pipe(take(1)).subscribe(player => playerClickPower = player.clickPower);
    const deductionPower = +(playerClickPower / this.enemyCP).toFixed(2);
    this.fightProgress = +(this.fightProgress + deductionPower).toFixed(2);

    if (this.fightProgress >= 1) {
      this.battleEnded$.next(true);
    }
  }

  onCheat() {
    this.fightProgress = 1;
    this.battleEnded$.next(true);

    this.store.dispatch(addResources({
      gold: 1000,
      experience: 1000,
      magicEssence: 1000
    }));
  }
}
