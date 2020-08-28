import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor() { }

  getFightResults(playerTeam, enemyTeam): any {
    const playerIsWinner = playerTeam > enemyTeam;
    const modificator = (playerTeam / enemyTeam).toFixed(2);

    return {
      playerIsWinner,
      modificator
    };
  }
}
