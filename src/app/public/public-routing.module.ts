import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamaskGuard } from '../guards/metamask.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NftDropComponent } from './nft-drop/nft-drop.component';
import { PlaygroundComponent } from './playground/playground.component';
import { VoteComponent } from './vote/vote.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: LandingpageComponent
  },
  {
    path: 'nft',
    component: NftDropComponent
  },
  {
    path: 'scribble',
    component: PlaygroundComponent,
    canActivate: [MetamaskGuard]
  },
  {
    path: 'vote',
    component: VoteComponent,
    canActivate: [MetamaskGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
