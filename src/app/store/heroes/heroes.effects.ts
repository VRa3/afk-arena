import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {buyCharacter} from './heroes.actions';
import {map} from 'rxjs/operators';
import {deductResources} from '../resources/resources.actions';

@Injectable()
export class HeroesEffects {
  @Effect()
  deductMoneyAfterCharacterBuy$ = this.actions$.pipe(
    ofType(buyCharacter),
    map(action => deductResources({resourceType: 'gold', amount: action.price}))
  );

  constructor(private actions$: Actions) {
  }
}
