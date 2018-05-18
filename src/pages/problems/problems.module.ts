import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemsPage } from './problems';

@NgModule({
  declarations: [
    ProblemsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemsPage),
  ],
})
export class ProblemsPageModule {}
