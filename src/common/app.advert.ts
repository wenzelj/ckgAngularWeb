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
  
    constructor( public authHttp: AuthHttp, private _advertService:AdvertService){
      this.advert = _advertService.getAdvert();
    }

    


}