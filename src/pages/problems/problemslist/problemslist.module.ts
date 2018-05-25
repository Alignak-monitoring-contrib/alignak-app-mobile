import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemsListPage} from "./problemslist";

@NgModule({
  declarations: [
    ProblemsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemsListPage),
  ],
})
export class ProblemsListPageModule {}
