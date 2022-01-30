import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NftDropComponent } from './nft-drop/nft-drop.component';
import { PlaygroundComponent } from './playground/playground.component';

@NgModule({
  declarations: [
    LandingpageComponent,
    NftDropComponent,
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
