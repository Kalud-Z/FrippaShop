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
  isLoading = false;
  module : string;


  constructor(private router : Router , private authService : AuthService) { }
  
  ngDoCheck() {
    this.currentURL  = this.router.url; 

    if(this.currentURL.includes('login')) {
      this.hideNavBar = true;
    }

    else {
      this.hideNavBar = false;
    }
  }


  onLogout() {
    this.authService.logout();
  }


  showLoadingSpinner(moduleClicked : string) {
    this.isLoading = true;
    this.module = moduleClicked;
    setTimeout(() => { this.isLoading = false }, 2000);

  }


} //class###############################################################################################

