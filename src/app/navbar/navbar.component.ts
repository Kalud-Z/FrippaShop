import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { tasksCrudService } from '../tasks/services/tasks-crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// #########################################################################################################################################################
export class NavbarComponent implements OnInit { //###########################################################################################################################
  hideNavBar : boolean;
  currentURL  : string;
  isLoading = false;
  isLoadingTemp : boolean;
  module : string;

  clickInsideNav = false;
  // clickInsideNav = false;

  constructor(private router : Router ,
              private authService : AuthService,
              private tasksCrudService : tasksCrudService
              ) { }

  ngOnInit(){
    this.tasksCrudService.isLoadingSubject.subscribe(data => {
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
