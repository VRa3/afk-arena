import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  addRandomHeroOnInit,
  addResources,
  buyCharacter,
  levelUpCharacter,
  resetOfflineTimer,
  startOfflineTimer
} from './store.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppService} from '../app.service';
import {of} from 'rxjs';


@Injectable()
export class StoreEffects {
  @Effect({dispatch: false})
  addMoney$ = this.actions$.pipe(
    ofType(addResources),
    tap(() => console.log('addMoney Effect'))
  );

  @Effect({dispatch: false})
  countTeamCP$ = this.actions$.pipe(
    ofType(addRandomHeroOnInit, buyCharacter, levelUpCharacter),
    tap(() => this.appService.countTeamCP())
  );

  @Effect({dispatch: false})
  startOfflineTimer$ = this.actions$.pipe(
    ofType(startOfflineTimer),
    tap(() => {
      if (!localStorage.getItem('offlineStart')) {
        localStorage.setItem('offlineStart', String(Date.now()));
      }
    })
  );

  @Effect({dispatch: false})
  resetOfflineTimer$ = this.actions$.pipe(
    ofType(resetOfflineTimer),
    tap(() => localStorage.setItem('offlineStart', String(Date.now())))
  );

  @Effect({dispatch: false})
  handleHeroLevel$ = this.actions$.pipe(
    ofType(levelUpCharacter),
    withLatestFrom(this.store),
    switchMap(([actionData, storeObj]) => {
      const {lvlCap, lvlCurrent} = (storeObj as any).store.heroesList[actionData.characterName];
      if (lvlCap === lvlCurrent) {
        console.log('sorry, dalej nie da rady');
      }
      return of('elo');
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private appService: AppService
  ) {
  }
}
