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
    this.synchUIService.isComponentLoadingSubject.subscribe(data => {
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


  onLogout() {
    this.authService.logout();
  }


  showLoadingSpinner(moduleClicked : string) {
    this.isLoading = true;
    this.module = moduleClicked;
    
    setTimeout(() => { 
      this.isLoading = this.isLoadingTemp;
      this.isLoadingTemp = true;
     }, 2000);

  }

  clickedOutsideNav() {
    // console.log('clickedOutsideNav is called')
    this.clickInsideNav = false;
  }

  // navClicked() {
  //   // console.log('navClicked is called')
  //   // this.clickInsideNav = true;
  // }

  mouseEnterNav() {
    setTimeout(() => {
      this.clickInsideNav = true;
    }, 10);
  }

  mouseLeaveNav() {
    // console.log('mouseLeave is called')
    this.clickedOutsideNav();
  }


} //class####################################################################################################################################################
// /##########################################################################################################################################################
