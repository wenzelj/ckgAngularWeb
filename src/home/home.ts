import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import { contentHeaders } from '../common/headers';
import { Appadvert } from '../common/app.advert';
import { Advert } from '../models/advert';
let styles = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [CORE_DIRECTIVES, Appadvert],
  template: template,
  styles: [styles]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  advert: any;
  loading: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    var date = new Date();
    var dateformat = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear()
    this.advert = new Advert('','','','',dateformat, dateformat );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }
  
  //   base64(file, callback){
  //   var coolFile = {};
  //   function readerOnload(e){
  //     var base64 = btoa(e.target.result);
  //     coolFile.base64 = base64;
  //     callback(coolFile)
  //   };

  //   var reader = new FileReader();
  //   reader.onload = readerOnload;

  //   var file = file[0].files[0];
  //   coolFile.filetype = file.type;
  //   coolFile.size = file.size;
  //   coolFile.filename = file.name;
  //   reader.readAsBinaryString(file);
  // }
  
 
  advertUpload(event, advert) {
    var encodedFile;
    var files = event.srcElement.files;
    var file = files[0];
    var reader = new FileReader();
    console.log(files);
        if (files && file) { 
        var reader = new FileReader();
        reader.onload = function(e){
          advert.image = reader.result;
        }
        reader.readAsDataURL(file);
    }   
  }
  
    voucherUpload(event, advert) {
    var encodedFile;
    var files = event.srcElement.files;
    var file = files[0];
    var reader = new FileReader();
    console.log(files);
        if (files && file) { 
        var reader = new FileReader();
        reader.onload = function(e){
          advert.voucher = reader.result;
        }
        reader.readAsDataURL(file);
    }   
  }
  


  save(newadvert){
  this.loading = true;
  this.response = null;
  let body = JSON.stringify(newadvert);
  this.authHttp.post('http://localhost:3001/api/protected/advert',
                       body,
                      { headers: contentHeaders } )
      .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text())
  }

  // callAnonymousApi() {
  //   this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  // }

  // callSecuredApi() {
  //   this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  // }

  // _callApi(type, url) {
  //   this.response = null;
  //   if (type === 'Anonymous') {
  //     // For non-protected routes, just use Http
  //     this.http.get(url)
  //       .subscribe(
  //         response => this.response = response.text(),
  //         error => this.response = error.text()
  //       );
  //   }
  //   if (type === 'Secured') {
  //     // For protected routes, use AuthHttp
  //     this.authHttp.get(url)
  //       .subscribe(
  //         response => this.response = response.text(),
  //         error => this.response = error.text()
  //       );
  //   }
  // }
}
