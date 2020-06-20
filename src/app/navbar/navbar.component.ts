import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../login/_services/auth.service';
import { SynchUIService } from '../_services/synch-ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

// #########################################################################################################################################################
export class NavbarComponent implements OnInit { //###########################################################################################################################
  currentURL  : string;
  module : string;
  
  hideNavBar : boolean;
  clickInsideNav = false;
  isLoading = false;
  isLoadingTemp : boolean;


  constructor(private router : Router ,
              private authService : AuthService,
              private synchUIService : SynchUIService
              ) { }

  ngOnInit(){
    this.synchUIService.isComponentLoading$.subscribe(data => {
       this.isLoadingTemp = data;
    })
  }
  

  ngDoCheck() {
    this.currentURL  = this.router.url; 

    if(this.currentURL.includes('login')) {
      this.hideNavBar = true;
    }

    else {
      this.hideNavBar = false;
    }
  }


  onLogout() { this.authService.logout() }


  showLoadingSpinner(moduleClicked : string) {
    this.isLoading = true;
    this.module = moduleClicked;
    
    setTimeout(() => { 
      this.isLoading = this.isLoadingTemp;
      this.isLoadingTemp = true;
     }, 2000);

  }

  clickedOutsideNav() { this.clickInsideNav = false }

  mouseEnterNav() {
    setTimeout(() => { this.clickInsideNav = true }, 10);
  }

  mouseLeaveNav() {  this.clickedOutsideNav() }


} //class####################################################################################################################################################
// /##########################################################################################################################################################
