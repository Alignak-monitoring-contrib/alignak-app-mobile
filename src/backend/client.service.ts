import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class BackendClient {
  token: string;
  url: string;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.token = localStorage.getItem('token');
    this.url = localStorage.getItem('url');
    this.get_livesynthesis()

  }

  public login(username: string, password: string){
    let body = {
      username: username,
      password: password
    };
    return this.http.post(
      this.url +'/login',
      body)
  }

  public get_data() {

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

  public get_livesynthesis() {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);

    return this.http.get(
      this.url + '/livesynthesis', {headers}
    )
  }

  public get_hosts() {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}));

    return this.http.get(
      this.url + '/host', {headers, params}
    )
  }

}
