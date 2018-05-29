import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


const BACKEND_PAGINATION_LIMIT = 25;

@Injectable()
/**
 * Class who make requests on Alignak backend
 * Injectable service
 */
export class BackendClient {
  token: string;
  url: string;

  /**
   * @param {HttpClient} http - http client for requests
   */
  constructor(public http: HttpClient) {
    this.updateData()
  }

  /**
   * Update data of backend: {@link url} and {@link token}
   */
  private updateData(){
    this.token = localStorage.getItem('token');
    this.url = localStorage.getItem('url');
  }

  /**
   * GET http function
   * @param {string} endpoint - endpoint of request
   * @param {HttpParams} params - http parameters of request
   * @param {HttpHeaders} headers - http headers of request
   * @returns {Observable<Object>} - observable object
   */
  private get(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<Object> {
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

  /**
   * POST http function
   * @param {string} endpoint - endpoint of request
   * @param {Object} body - jsonable object to post
   * @returns {Observable<Object>} - observable object
   */
  private post(endpoint: string, body: Object): Observable<Object> {
    return this.http.post(this.url + '/' + endpoint, body)
  }

  /**
   * Post on "login" endpoint
   * @param {string} username - username of backend
   * @param {string} password - password of backend
   * @returns {Observable<any>} - observable object
   */
  public login(username: string, password: string): Observable<any> {
    let body = {
      username: username,
      password: password
    };
    return this.post('login', body)
  }

  /**
   * Return livesynthesis data
   * @returns {Observable<any>} - observable object
   */
  public getLivesynthesis(): Observable<any> {
    return this.get('livesynthesis')
  }

  /**
   * Return host data for given endpoint
   * @param {string} endpoint - endpoint of request, default is "host"
   * @returns {Observable<any>} - observable object
   */
  public getHosts(endpoint = 'host'): Observable<any> {
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
    ));

    return this.get(endpoint, params)
  }

  /**
   * Return list of service for given host
   * @param {string} endpoint - endpoint of request
   * @param {Object} host - host item data
   * @returns {Observable<any>} - observable object
   */
  public getHostServices(endpoint: string, host: Object): Observable<any> {
    let params = new HttpParams()
      .set('where', JSON.stringify({'_is_template': false, 'host': host['_id']}))
      .set('max_results', JSON.stringify(BACKEND_PAGINATION_LIMIT
      ));

    return this.get(endpoint, params)
  }

  /**
   * Return item in problems for corresponding state
   * @param {string} endpoint - endpoint for request ("host" or "service")
   * @param {string} state - state to get
   * @returns {Observable<any>} - observable object
   */
  public getProblems(endpoint: string, state: string): Observable<any> {
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
