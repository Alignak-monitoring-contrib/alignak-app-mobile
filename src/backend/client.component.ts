import {Component} from "@angular/core";
import {BackendClient} from "./client.service";

@Component({
  providers: [BackendClient],
  selector: "backend",
  template: '',
})

export class BackendComponent {

  constructor() {}

}
