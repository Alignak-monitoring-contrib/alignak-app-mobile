import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HostPage, ServicePage} from './item';

@NgModule({
  declarations: [
    HostPage,
    ServicePage
  ],
  imports: [
    IonicPageModule.forChild(HostPage),
  ],

})
export class ItemPageModule {}
