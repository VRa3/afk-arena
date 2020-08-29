import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {addResources, deductResources} from './store.actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';



@Injectable()
export class StoreEffects {
  @Effect({dispatch: false})
  addMoney$ = this.actions$.pipe(
    ofType(addResources),
    tap(() => console.log('addMoney Effect'))
    );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
