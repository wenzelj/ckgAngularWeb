
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import { AdvertService } from '../models/app.components';

let styles = require('./manage.css');
let template = require('./manage.html');


@Component({
  selector: 'Manage',
  providers:[AdvertService]
})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Manage {
  jwt: string;
  decodedJwt: string;
  adverts: any;
  constructor(public router: Router, public advertService : AdvertService ) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    //  advertService.getAdverts().subscribe(
    //    adverts => this.adverts = adverts,
    //    error => console.log('Error' + error),
    //    () => console.log('completed!') 
    //    );

  }
  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }
}
