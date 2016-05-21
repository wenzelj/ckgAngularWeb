import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';


import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {Manage} from '../manage/manage';
import {Appadvert} from '../common/app.advert';

let template = require('./app.html');

@Component({
  selector: 'auth-app'
})
@View({
  template: template,
  directives: [ LoggedInRouterOutlet, ROUTER_DIRECTIVES, Appadvert ]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/signup', component: Signup, as: 'Signup' },
   { path: '/manage', component: Manage, as: 'Manage' }
])

export class App {
  title: string;
  
  constructor(public router: Router, public location:Location) {
	this.title = "CKG Consulting Advert Admin"
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
