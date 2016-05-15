import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';


import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {Order} from '../order/order';

let template = require('./app.html');

@Component({
  selector: 'auth-app'
})
@View({
  template: template,
  directives: [ LoggedInRouterOutlet, ROUTER_DIRECTIVES ]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/signup', component: Signup, as: 'Signup' },
   { path: '/order', component: Order, as: 'Order' }
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
