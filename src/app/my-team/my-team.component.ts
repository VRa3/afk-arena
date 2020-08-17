import { Component, OnInit } from '@angular/core';
import {select, State} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IState} from '../store/store.reducer';
import {Ihero} from '../hero-card/Ihero';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  myTeam: Ihero[] = [];
  store$: Observable<IState>;

  constructor(private store: State<IState>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store$.subscribe(store => {
      const {heroesList} = store;

      this.myTeam = heroesList.filter(hero => hero.favorite);
    });
  }
}
