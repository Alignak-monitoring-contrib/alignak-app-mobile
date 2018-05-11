import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostPage } from './host';

@NgModule({
  declarations: [
    HostPage,
  ],
  imports: [
    IonicPageModule.forChild(HostPage),
  ],
})
export class HostPageModule {}
