import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HostSynthesisPage} from './hostsynthesis';

@NgModule({
  declarations: [
    HostSynthesisPage,
  ],
  imports: [
    IonicPageModule.forChild(HostSynthesisPage),
  ],

})
export class HostSynthesisPageModule {}
