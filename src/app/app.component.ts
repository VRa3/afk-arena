import {Component, OnInit} from '@angular/core';
import {Ihero} from './hero-card/Ihero';
import {Faction} from './models/enums/faction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour-game';

  ngOnInit(): void {
  }
}
