import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {addMoney, deductMoney} from './store.actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';



@Injectable()
export class StoreEffects {
  @Effect({dispatch: false})
  addMoney$ = this.actions$.pipe(
    ofType(addMoney),
    tap(() => console.log('addMoney Effect'))
    );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
