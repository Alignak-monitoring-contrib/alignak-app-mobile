import { NgModule } from '@angular/core';
import {KeysPipe} from "./pipes";

@NgModule({
  providers: [],
  declarations: [
    KeysPipe
  ],
  exports: [
    KeysPipe
  ]
})

export class SharedModule {}
