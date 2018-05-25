import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HostSynthesisPage} from './hostsynthesis';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    HostSynthesisPage,
  ],
  imports: [
    IonicPageModule.forChild(HostSynthesisPage),
    SharedModule
  ],

})
export class HostSynthesisPageModule {}
