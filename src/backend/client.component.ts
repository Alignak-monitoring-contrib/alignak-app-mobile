import {Component} from "@angular/core";
import {BackendClient} from "./client.service";

@Component({
  providers: [BackendClient],
  selector: "backend",
  template: '',
})

export class BackendComponent {
  public getData: string;

  constructor(private client: BackendClient) {}

  // public onHostGet() {
  //   this.httpService.getAll("Computer")
  //     .subscribe(function(data) {
  //         this.getData = data;
  //       }.bind(this),
  //     );
  // }
}
