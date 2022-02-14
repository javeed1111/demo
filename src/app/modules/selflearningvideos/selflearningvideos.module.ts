import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelflearningvideosRoutingModule } from './selflearningvideos-routing.module';
import { SelflearningvideosComponent } from './selflearningvideos/selflearningvideos.component';
import { SelfLearningVideoComponent } from './selflearningvideo.component';


@NgModule({
  declarations: [
    SelflearningvideosComponent,
    SelfLearningVideoComponent
  ],
  imports: [
    CommonModule,
    SelflearningvideosRoutingModule
  ]
})
export class SelflearningvideosModule { }
