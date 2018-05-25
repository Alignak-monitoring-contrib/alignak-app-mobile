import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HostSynthesisPage, KeysPipe} from './hostsynthesis';

@NgModule({
  declarations: [
    HostSynthesisPage,
    KeysPipe
  ],
  imports: [
    IonicPageModule.forChild(HostSynthesisPage),
  ],
})
export class HostSynthesisPageModule {}
