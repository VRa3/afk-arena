import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, State} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {IState} from '../store/store.reducer';
import {IHero} from '../hero-card/IHero';
import {AppService} from '../app.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit, OnDestroy, AfterViewChecked {
  myTeam: IHero[] = [];
  teamPower = 0;
  teamMembers = [];
  store$: Observable<IState>;
  sub: Subscription;

  constructor(private store: State<IState>, private cdRef: ChangeDetectorRef, private appService: AppService) {
    this.store$ = store.pipe(select('store'));
  }

  ngOnInit(): void {
    this.sub = this.store$.subscribe(store => {
      this.myTeam = [];

      for (const hero in store.heroesList) {
        if (store.heroesList.hasOwnProperty(hero)) {
          if (store.heroesList[hero].obtained) {
            this.myTeam.push(store.heroesList[hero]);
          }
        }
      }
    });

    this.teamPower = this.appService.countTeamCP();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
