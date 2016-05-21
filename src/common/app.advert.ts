import { Component } from 'angular2/core';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { AdvertService } from '../models/app.components';
@Component({
  selector: '[appadvert]',
  providers: [AdvertService],
  // inputs:['model'],
  templateUrl: 'src/common/app.advert.html'

})
export class Appadvert { 
    advert: Object;
  //   loading: boolean = false;
  //   response: string;
      
    constructor( public authHttp: AuthHttp, private _advertService:AdvertService){
      this.advert = _advertService.getAdvert();
    }
  //   set appadvert(advert:any){
  //     this.advert = advert;
  //   }
    
  // save(newadvert){
  // this.loading = true;
  // this.response = null;
  // let body = JSON.stringify(newadvert);
  // this.authHttp.post('http://localhost:3001/api/protected/advert',
  //                      body,
  //                     { headers: contentHeaders } )
  //     .subscribe(
  //         response => this.response = response.text(),
  //         error => this.response = error.text()
  //     )
  //   }

}