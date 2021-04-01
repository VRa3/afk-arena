import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IResources} from '../../models/interfaces/IResources';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BottomBarComponent implements OnInit {
  @Input() resources: IResources;

  constructor() {}

  ngOnInit(): void {
    console.log(this.resources);
  }
}
