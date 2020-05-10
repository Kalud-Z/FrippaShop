import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { crudService } from '../tasks/services/crud.service';

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


  constructor(private router : Router ,
              private authService : AuthService,
              private tasksCrudService : crudService
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
      this.isLoading = this.isLoadingTemp
     }, 2000);

  }


} //class###############################################################################################

