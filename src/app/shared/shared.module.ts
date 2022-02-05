import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SubmitComponent } from './submit/submit.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  NavComponent,
  FooterComponent,
  SubmitComponent,
  AlertComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
