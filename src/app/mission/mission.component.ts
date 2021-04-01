import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Store} from '@ngrx/store';
import {addResources} from '../store/store.actions';
import {IFightResults, MissionService} from './mission.service';
import {interval, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

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
  currentFightResults: IFightResults;
  timeToEndBattle: number;
  currentChapter: number;
  subManager = new Subscription();
  stages: number[];
  rewards: any;
  hasMoreChapters = true;

  constructor(private store: Store, private appService: AppService, private missionService: MissionService) {
  }

  ngOnInit(): void {
    this.appService.teamCP$.subscribe(teamPower => this.teamCP = teamPower);

    const stageAndRewardsSub = this.missionService.rewards$.subscribe(stagesAndRewards => {
      const {stages, goldRewards, experienceRewards, magicEssenceRewards} = stagesAndRewards as any;

      this.stages = stages;
      this.rewards = {
        goldRewards,
        experienceRewards,
        magicEssenceRewards
      };
    });

    this.missionService.generateStagesAndRewards();

    const currentStageSub = this.appService.currentStage$.subscribe(data => {
      this.currentChapter = data;
      this.enemyCP = this.stages[this.currentChapter];
      if (!this.enemyCP) {
        this.hasMoreChapters = false;
      }
    });

    this.subManager.add(stageAndRewardsSub);
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

    interval(1000).pipe(take(this.timeToEndBattle)).subscribe({
      next: () => this.countdownToBattleEnd(),
      complete: () => {
        this.timeToEndBattle = null;

        this.giveRewards();

        if (this.currentFightResults.playerIsWinner) {
          this.appService.advancePlayerToNextStage(this.currentChapter + 1);
        }
      }
    });
  }

  countdownToBattleEnd(): void {
    this.timeToEndBattle = this.timeToEndBattle - 1;
  }

  countFightResults(): void {
    this.currentFightResults = this.missionService.getFightResults(this.teamCP, this.enemyCP);
    this.timeToEndBattle = Math.floor(this.missionService.missionBaseTime / this.currentFightResults.timeModificator);
  }

  giveRewards(): void {
    this.store.dispatch(addResources({
      gold: this.rewards.goldRewards[this.currentChapter - 1],
      experience: this.rewards.experienceRewards[this.currentChapter - 1],
      magicEssence: this.rewards.magicEssenceRewards[this.currentChapter - 1]
    }));
  }

  collectAFKMoney(): void {
    const now = Date.now();
    const offlineStart = +localStorage.getItem('offlineStart');
    const differenceInSeconds = Math.round((now - offlineStart) / 1000);
    const multiplier = +(differenceInSeconds / 3600).toFixed(2);

    this.store.dispatch(addResources({
      gold: (this.rewards.goldRewards[this.currentChapter - 1] * multiplier),
      experience: (this.rewards.experienceRewards[this.currentChapter - 1] * multiplier),
      magicEssence: (this.rewards.magicEssenceRewards[this.currentChapter - 1] * multiplier)
    }));
  }
}
