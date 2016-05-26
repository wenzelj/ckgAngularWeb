
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES, NgFor } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import { AdvertService } from '../models/app.components';
import { Advert } from '../models/advert'
import { OnInit } from 'angular2/core';
let styles = require('./manage.css');
let template = require('./manage.html');

@Component({
  selector: 'Manage',
  providers:[AdvertService],
})
@View({
  directives: [CORE_DIRECTIVES, NgFor],
  template: template,
  styles: [styles]
})
export class Manage  implements OnInit {  
  jwt: string;
  decodedJwt: string;
  adverts: Array<Advert>;
  message:string;
  firstAdvert: any;
  loading: boolean;
  toast: any;
  constructor(public router: Router, public advertService : AdvertService ) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    toastr.options = { positionClass: 'toast-bottom-right', }  
  }
  
  extractData(data){
        this.adverts = new Array(data.length);
        console.log(data);
        this.adverts = data;
      }
  
  getData(){  
      this.advertService.getAdverts()
      .subscribe( 
       // data => this.adverts = data,
        data => this.extractData(data),
        () => console.log('done')
        );
  }
  
 showSuccessMessage( message){
    this.loading = false;
    toastr.info(message);
 }
   
 showErrorMessage( message){
    this.loading = false;
    toastr.error(message);
 }
 
  update(advert){
    this.loading = true;
    this.advertService.updateAdvert(advert)
    .subscribe(
      data => this.showSuccessMessage(data._body),
      error => this.showErrorMessage(error._body),
         () => console.log('done')
         
    )
  }
  
  delete(advert){
     this.advertService.deleteAdvert(advert)
    .subscribe(
      data => this.message = data
    )
  }
   
  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }
  
  ngOnInit() {
     this.getData();
   }
   
}
