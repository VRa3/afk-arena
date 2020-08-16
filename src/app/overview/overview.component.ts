import {Component, OnInit} from '@angular/core';
import {Ihero} from '../hero-card/Ihero';
import {Observable} from 'rxjs';
import {select, State} from '@ngrx/store';
import {IState} from '../store/store.reducer';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  heroes: Ihero[] = [];
  store$: Observable<IState>;

  constructor(private store: State<IState>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store$.subscribe(store => {
      const {heroesList} = store;
      this.heroes = heroesList.map(hero => hero);
    });
  }
}
