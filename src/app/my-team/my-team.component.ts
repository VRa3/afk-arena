import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {select, State} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IState} from '../store/store.reducer';
import {Ihero} from '../hero-card/Ihero';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit, AfterViewChecked {
  myTeam: Ihero[] = [];
  teamPower = 0;
  teamMembers = [];
  store$: Observable<IState>;

  constructor(private store: State<IState>, private cdRef: ChangeDetectorRef) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.store$.subscribe(store => {
      this.myTeam = [];

      for (const hero in store.heroesList) {
        if (store.heroesList.hasOwnProperty(hero)) {
          if (store.heroesList[hero].obtained) {
            this.myTeam.push(store.heroesList[hero]);
          }
        }
      }
    });
  }

  getValue({cp, name}) {
    if (this.teamMembers.includes(name)) {
      return;
    }

    this.teamMembers.push(name);
    this.teamPower += cp;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
