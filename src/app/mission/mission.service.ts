import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor() {}

  getFightResults(playerTeam, enemyTeam): any {
    const playerIsWinner: boolean = playerTeam > enemyTeam;
    const modificator: string = (playerTeam / enemyTeam).toFixed(2);

    return {
      playerIsWinner,
      modificator
    };
  }
}
