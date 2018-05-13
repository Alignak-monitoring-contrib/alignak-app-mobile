import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard} from "./dashboard";
import {NgCircleProgressModule} from "ng-circle-progress";

@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    IonicPageModule.forChild(Dashboard),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
})
export class DashboardModule {}
