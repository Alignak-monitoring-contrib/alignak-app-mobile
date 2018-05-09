import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'alignak',
  template: ''
})
export class BackendClient {
  token: string;
  url: string;
  http: HttpClient;
  hosts = {};
  services = {};
  nb_items = {host:0, service: 0, total: 0};

  constructor(token: string, http: HttpClient, url: string) {
    this.token = token;
    this.http = http;
    this.url = url;

    this.get_data().subscribe(
            function (data) {
              this.hosts = data[0]['_items'];
              this.services = data[1]['_items'];

              this.nb_items.host = data[0]['_items'].length;
              this.nb_items.service = data[1]['_items'].length;
              this.nb_items.total = data[0]['_items'].length + data[1]['_items'].length;
              console.log('Hosts ', this.hosts);
              console.log('Services ', this.services);
              console.log('Len ', this.nb_items);
            }.bind(this)
    );

  }

  private get_data() {

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);

    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}));

    return Observable.forkJoin(
      this.http.get(
        this.url + '/host', {headers, params}
      ),
      this.http.get(
        this.url + '/service', {headers, params}
      )
    );

  }

}
