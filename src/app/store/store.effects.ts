import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  addRandomHeroOnInit,
  resetOfflineTimer,
  startOfflineTimer
} from './store.actions';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppService} from '../app.service';
import {of} from 'rxjs';
import {buyCharacter, levelUpCharacter} from './heroes/heroes.actions';
import {addResources} from './resources/resources.actions';


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
    withLatestFrom(this.store.select('heroesList')),
    switchMap(([actionData, heroesList]) => {
      const {lvlCap, lvlCurrent} = heroesList[actionData.characterName];
      if (lvlCap === lvlCurrent) {
        console.log('sorry, dalej nie da rady');
      }
      return of('elo');
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private appService: AppService
  ) {
  }
}
