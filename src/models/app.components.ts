import { Injectable, Inject } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { Advert } from './advert';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class AdvertService {
  advert:Advert;
  http : any;
  baseUrl: string;
  authHttp :any;
  advertUrl : string;
  protectedAdvertUrl: string;
  constructor(public _http: Http, public _authHttp: AuthHttp) {
      console.log('AdvertService created');
      var date = new Date();
      var dateformat = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear()
      this.advert= new Advert('','','','',dateformat, dateformat);
      this.http =_http;
      this.authHttp = _authHttp;
    }
  
    getAdvert() {
        return this.advert;
    }
    
    getAdverts(url): Observable<Advert[]>{
         return this.http.get(url + 'getAdverts')
         .map(this.extractData)
         .catch(this.handleError);
    }
    
    showSuccessMessage( message){
        toastr.info(message);
    }
   
    showErrorMessage( message){
        toastr.error(message);
    }
    
    updateAdvert(url, advert): Observable<any> {
        let body = JSON.stringify(advert);
        return this._authHttp.post(url + 'update', 
        body, { headers: contentHeaders } )
        .catch(this.handleError)
    }
    
    deleteAdvert(url, advert): Observable<any> {
        // let jsonAdvert = JSON.stringify(advert);
        let body =  JSON.stringify({name: advert.name, __etag: advert.__etag });
        return this.authHttp.post(url + 'delete', 
            body, { headers: contentHeaders } )
        .catch(this.handleError)
    }
   
    private extractData(res: Response) {
    let body = res.json();
  
    return body || { };
  }
     
    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    this.showErrorMessage(errMsg)
    return Observable.throw(errMsg);
  }
    
    // getAdverts(){
    //     return this.http.get(this.advertUrl + '/getAdverts')
    // }
}




