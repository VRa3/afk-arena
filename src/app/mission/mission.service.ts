import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface IFightResults {
  playerIsWinner: boolean;
  timeModificator: number;
}

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  resourcesBase = {
    CP: 100,
    gold: 25,
    experience: 30,
    magicEssence: 10
  };
  // tslint:disable-next-line:variable-name
  rewards$ = new Subject();
  missionBaseTime = 3;

  getFightResults(playerTeam: number, enemyTeam: number): IFightResults {
    const playerIsWinner: boolean = playerTeam > enemyTeam;
    const timeModificator: number = +(playerTeam / enemyTeam).toFixed(2);

    return {
      playerIsWinner,
      timeModificator
    };
  }

  generateStagesAndRewards() {
    let {CP, gold, experience, magicEssence} = this.resourcesBase;

    const stages = [];
    const goldRewards = [];
    const experienceRewards = [];
    const magicEssenceRewards = [];

    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        CP *= 1.11;
        gold *= 1.11;
        experience *= 1.11;
        magicEssence *= 1.11;
      } else {
        CP *= 1.08;
        gold *= 1.08;
        experience *= 1.08;
        magicEssence *= 1.08;
      }

      stages.push(+(CP.toFixed(2)));
      goldRewards.push(+(gold.toFixed(2)));
      experienceRewards.push(+(experience.toFixed(2)));
      magicEssenceRewards.push(+(magicEssence.toFixed(2)));
    }

    this.rewards$.next({
      stages,
      goldRewards,
      experienceRewards,
      magicEssenceRewards
    });
  }
}
