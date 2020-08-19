import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../models/interfaces/IUser';
import {IMoney} from '../../models/interfaces/IResources';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BottomBarComponent implements OnInit {
  @Input() money: IMoney;

  constructor() {}

  ngOnInit(): void {

  }
}
