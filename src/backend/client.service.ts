import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


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
    this.updateData()
  }

  private updateData(){
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

  private get(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    this.updateData();
    if (headers == null){
      headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Authorization', this.token);
    }
    return this.http.get(
      this.url + '/' + endpoint, {headers, params}
    )
  }

  public getLivesynthesis(): Observable<any> {
    // Return observable with livesynthesis data
    return this.get('livesynthesis')
  }

  public getHosts(): Observable<any> {
    // Return observable with list of all Hosts
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
    ));

    return this.get('host', params)
  }

  public getHostServices(host: {}): Observable<any> {
    // Return observable with services of given host
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false, 'host': host['_id']}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
      ));

    return this.get('service', params)
  }

  public getProblems(endpoint: string, state: string) {
    // Return observable with problemms for given endpoint and state
    let params = new HttpParams()
      .set('where', JSON.stringify({
        '_is_template': false,
        'ls_state': state,
        'ls_acknowledged': false,
        'ls_downtimed': false
      }));
    return this.get(endpoint, params)
  }
}
