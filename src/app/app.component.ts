import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IState} from './store/store.reducer';
import {Observable} from 'rxjs';
import {IUser} from './models/interfaces/IUser';
import {addRandomHeroOnInit} from './store/store.actions';
import {IMoney} from './models/interfaces/IResources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour-game';
  store$: Observable<any>;
  money: IMoney;

  constructor(private store: Store<any>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store.dispatch(addRandomHeroOnInit());

    this.store$.subscribe(store => {
      this.money = store.money;
    });
  }
}
