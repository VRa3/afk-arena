import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {buyCharacter, levelUpCharacter} from './heroes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {deductResource, deductResources} from '../resources/resources.actions';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {HeroService} from '../../hero-card/hero.service';

@Injectable()
export class HeroesEffects {
  @Effect()
  deductMoneyAfterCharacterBuy$ = this.actions$.pipe(
    ofType(buyCharacter),
    map(action => deductResource({resourceType: 'gold', amount: action.price}))
  );

  @Effect()
  deductResourcesAfterLeveling$ = this.actions$.pipe(
    ofType(levelUpCharacter),
    withLatestFrom(this.store.select('heroesList')),
    switchMap(([actionData, heroesList]) => {
      const hero = heroesList[actionData.characterName];

      return of(deductResources({
        resources: this.heroService.getUpgradeCosts(hero, true)
      }));
    })
  );

  // todo: Probably useless
  // @Effect({dispatch: false})
  // handleHeroLevel$ = this.actions$.pipe(
  //   ofType(levelUpCharacter),
  //   withLatestFrom(this.store.select('heroesList')),
  //   switchMap(([actionData, heroesList]) => {
  //     const {lvlCap, lvlCurrent} = heroesList[actionData.characterName];
  //     if (lvlCap === lvlCurrent) {
  //       console.log('sorry, dalej nie da rady');
  //       return of('elo');
  //     }
  //     return of('elo');
  //   })
  // );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private heroService: HeroService
              ) {
  }
}
