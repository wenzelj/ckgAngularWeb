// Step 1. Import Injectable Decorator
import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { Advert } from './advert';
import { Observable }     from 'rxjs/Observable';

// Step 2. Use @Injectable() to declare the FriendSerivce class as an Injectable
@Injectable()


export class AdvertService {
  advert:Advert;
  http : any;
  baseUrl: string;
  authHttp :any;
  private advertUrl ='http://localhost:3001/api/advert/';
  private protectedAdvertUrl= 'http://localhost:3001/api/protected/advert/';
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
    
    getAdverts(): Observable<Advert[]>{
         return this.http.get(this.advertUrl + 'getAdverts')
         .map(this.extractData)
         .catch(this.handleError);
    }
    
    updateAdvert  = (advert): Observable<any> => {
        let body = JSON.stringify(advert);
        return this._authHttp.post(this.protectedAdvertUrl + 'update', 
        body, {})
        .catch(this.handleError)
    }
    
    deleteAdvert = (advert): Observable<any> => {
        let jsonAdvert = JSON.stringify(advert);
        let body = {advert: advert.name };
        return this.authHttp.post(this.protectedAdvertUrl + 'delete', 
            body, {})
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
    return Observable.throw(errMsg);
  }
    
    // getAdverts(){
    //     return this.http.get(this.advertUrl + '/getAdverts')
    // }
}

/** 
    Step 3A. - Create and export FriendsService  Class { }
    3B: create friends object and declare it to be an Array of any values/ 
    3C: Add friends object to the constructor function
    3D: create getFriends() function to call all friends values. 
**/
// 3A
export class FriendService { 

    // 3B 
    friends:Array<any>;

    // 3C
    constructor() {
        this.friends = [
            { age: 40, name: 'Jordan Houston' },
    { age: 23, name: 'Josh Beh' },
    { age: 23, name: 'Joseph Canina' },
    { age: 24, name: 'Alexandra Wilkins' },
    { age: 22, name: 'Kiersten Costanzo' },
    { age: 23, name: 'Ku Sherwood' },
    { age: 25, name: 'Arta Halili' },
    { age: 21, name: 'Patrick Cooney' },
    { age: 21, name: 'Z.A. Perr' },
    { age: 18, name: 'Tyler Mulligan' },
    { age: 26, name: 'Dennis Dempsey' },
    { age: 32, name: 'Francis Yeager' },
    { age: 23, name: 'Phil Belardi' },
    { age: 25, name: 'Bryan Roman' }
        ];
    }

    // 3D
    getFriends() {
        return this.friends;
    }

}



