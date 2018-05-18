import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


const BACKEND_PAGINATION_LIMIT = 10000;

@Injectable()
export class BackendClient {
  token: string;
  url: string;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.token = localStorage.getItem('token');
    this.url = localStorage.getItem('url');

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

  public getLivesynthesis() {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);

    return this.http.get(
      this.url + '/livesynthesis', {headers}
    )
  }

  public getHosts() {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
    ));

    return this.http.get(
      this.url + '/host', {headers, params}
    )
  }

  public getHostServices(host: {}) {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false, 'host': host['_id']}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
      ));

    return this.http.get(
      this.url + '/service', {headers, params}
    )
  }

  public getProblems(endpoint: string, state: string) {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token);
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false, 'ls_state': state, 'ls_acknowledged': false, 'ls_downtimed': false}))
      // .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT));
    return this.http.get(
      this.url + '/' + endpoint, {headers, params}
    )
  }
}
