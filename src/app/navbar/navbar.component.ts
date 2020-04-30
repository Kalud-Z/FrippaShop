import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hideNavBar : boolean;
  currentURL  : string;


  constructor(private router : Router , private authService : AuthService) { }
  
  ngDoCheck() {
    this.currentURL  = this.router.url; 

    if(this.currentURL.includes('login')) {
      // console.log(this.router.url),
      // console.log('we are in TRUE')
      this.hideNavBar = true;
    }

    else {
      this.hideNavBar = false;
    }
  }


  onLogout() {
    this.authService.logout();
  }


} //class###############################################################################################

