
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';

let styles = require('./order.css');
let template = require('./order.html');


@Component({
  selector: 'order'
})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Order {
  jwt: string;
  decodedJwt: string;
  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }



  _callApi(type, url) {
    this.response = null;

  }
}
