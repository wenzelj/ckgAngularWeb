import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import { contentHeaders } from '../common/headers';

let styles = require('./home.css');
let template = require('./home.html');




@Component({
  selector: 'home'
})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  advert: object;
  loading: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.advert = {};
    this.advert.longitude = 0;
    this.advert.latitude = 0;
    this.advert.url = "test";
    this.advert.voucher= "test";
    this.advert.startdate;
    this.advert.enddate;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }

  save(newadvert){
  this.loading = true;
  this.response = null;
  let body = JSON.stringify(newadvert);
  this.authHttp.post("http://localhost:3001/api/protected/advert", body,  { headers: contentHeaders } )
      .subscribe(
          response => this.success(response),
          error => failed(error);
  }

  success(response){
    this.response = response.text(); this.loading = false; this.showSuccess
  }

  failed(response){
    this.response = error.text();  this.loading = false; this.showError = true;
  }

  showSuccess(){
    this.success = true;
    this.fail = false;
  }

  showError(){
    this.success = false;
    this.fail = true;
  }


  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}