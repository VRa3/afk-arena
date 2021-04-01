import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IHero} from '../hero-card/IHero';
import {AppService} from '../app.service';
import {AppState} from '../store/app.reducer';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit, OnDestroy, AfterViewChecked {
  myTeam: IHero[] = [];
  teamPower = 0;
  sub: Subscription;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, private appService: AppService) {
  }

  ngOnInit(): void {
    // todo: This can be used with | async
    this.sub = this.store.select('heroesList').subscribe(heroesList => {
      this.myTeam = [];

      for (const hero in heroesList) {
        if (heroesList.hasOwnProperty(hero) && heroesList[hero].obtained) {
          this.myTeam.push(heroesList[hero]);
        }
      }
    });

    this.appService.teamCP$.subscribe(teamPower => this.teamPower = teamPower);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
