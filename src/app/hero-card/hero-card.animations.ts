import {animate, state, style, transition, trigger} from '@angular/animations';

export const starToggling = [
  trigger('starToggling', [
    state('true', style({
      color: 'rgb(252, 217, 131)'
    })),
    state('false', style({
      color: 'rgb(0, 0, 0)'
    })),
    transition('void => *', [animate('0s')]),
    transition('* => *', [animate('250ms')]),
  ])
];
