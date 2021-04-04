import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  addRandomHeroOnInit,
  resetOfflineTimer,
  startOfflineTimer
} from './store.actions';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppService} from '../app.service';
import {buyCharacter, levelUpCharacter} from './heroes/heroes.actions';
import {addResources} from './resources/resources.actions';
import {AppState} from './app.reducer';


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

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private appService: AppService
  ) {
  }
}
