import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
  declarations: [ProgressSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[ProgressSpinnerComponent]
})
export class ProgressSpinnerModule { }
