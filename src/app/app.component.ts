import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IState} from './store/store.reducer';
import {Observable} from 'rxjs';
import {IUser} from './models/interfaces/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour-game';
  store$: Observable<IState>;
  user: IUser;

  constructor(private store: Store<IState>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store$.subscribe(store => {
      this.user = store.user;
    });
  }
}
