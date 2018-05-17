import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostServicesPage } from './hostservices';

@NgModule({
  declarations: [
    HostServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(HostServicesPage),
  ],
})
export class HostServicesPageModule {}
