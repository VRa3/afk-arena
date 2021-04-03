import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {MyTeamComponent} from './my-team/my-team.component';
import {ShopComponent} from './shop/shop.component';
import {MissionComponent} from './mission/mission.component';

const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'my-team', component: MyTeamComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'mission', component: MissionComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
