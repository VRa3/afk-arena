import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Store} from '@ngrx/store';
import {addResources} from '../store/store.actions';
import {MissionService} from './mission.service';
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
  currentFightResults: any;
  timeAmount: number;
  timeBase: number;
  timeToEndBattle = 0;
  currentChapter: number;
  subManager = new Subscription();
  stages: number[];
  rewards: any;

  constructor(private store: Store, private appService: AppService, private missionService: MissionService) {
  }

  ngOnInit(): void {
    this.teamCP = this.appService.countTeamCP();

    this.subManager.add(this.missionService.rewards$.subscribe(stagesAndRewards => {
        const {stages, goldRewards, experienceRewards, magicEssenceRewards} = stagesAndRewards as any;

        this.stages = stages;
        this.rewards = {
          goldRewards,
          experienceRewards,
          magicEssenceRewards
        };
        console.log(this.rewards);
      })
    );

    this.missionService.generateStagesAndRewards();

    this.subManager.add(this.appService.currentStage$.subscribe(data => {
      this.currentChapter = data;
      this.enemyCP = this.stages[this.currentChapter];
    }));
  }

  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }

  startFight() {
    if (this.timeToEndBattle > 0) {
      return;
    }

    this.timeBase = 3;
    this.currentFightResults = this.missionService.getFightResults(this.teamCP, this.enemyCP);
    this.timeAmount = Math.floor(this.timeBase / this.currentFightResults.timeModificator);

    this.timeToEndBattle = this.timeAmount;
    interval(1000).pipe(take(this.timeAmount)).subscribe({
      next: data => this.timeToEndBattle = this.timeAmount - (data + 1),
      complete: () => {
        this.timeToEndBattle = null;
        this.store.dispatch(addResources({
          gold: this.rewards.goldRewards[this.currentChapter - 1],
          experience: this.rewards.experienceRewards[this.currentChapter - 1],
          magicEssence: this.rewards.magicEssenceRewards[this.currentChapter - 1]
        }));

        if (this.currentFightResults.playerIsWinner) {
          this.appService.advancePlayerToNextStage(this.currentChapter + 1);
        }
      }
    });
  }

  collectAFKMoney() {
    this.store.dispatch(addResources({gold: 5}));
  }
}
