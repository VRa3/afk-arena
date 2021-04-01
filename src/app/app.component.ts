import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addRandomHeroOnInit, startOfflineTimer} from './store/store.actions';
import {IResources} from './models/interfaces/IResources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour-game';
  store$: Observable<any>;
  resources: IResources;

  constructor(private store: Store<any>) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store.dispatch(addRandomHeroOnInit());
    this.store.dispatch(startOfflineTimer());

    this.store$.subscribe(store => {
      this.resources = store.resources;
    });
  }
}
