import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {addRandomHeroOnInit, startOfflineTimer} from './store/store.actions';
import {AppState} from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour-game';
  resources$ = this.store.select('resources');

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(addRandomHeroOnInit());
    this.store.dispatch(startOfflineTimer());
  }
}
