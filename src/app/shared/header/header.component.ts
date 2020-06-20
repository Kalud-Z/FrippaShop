import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/login/_services/auth.service';
import { SynchUIService } from 'src/app/_services/synch-ui.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// #########################################################################################################################################################
export class HeaderComponent implements OnInit  { //##########################################################################################################################
  currentUser : string;
  adminName : string;

  constructor(private authService : AuthService, private synchUIService : SynchUIService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserName;
    this.adminName = environment.khaledName;
  }


  clickedOutsideHeader() { this.synchUIService.clickInsideHeader$.next(false) }


  mouseEnterHeader() {
    setTimeout(() => { this.synchUIService.clickInsideHeader$.next(true) }, 20);
  }


  mouseLeaveHeader() { this.clickedOutsideHeader() }


  showFilter() { this.synchUIService.showFilter$.next(true) }


  onAddNewRow() {  this.synchUIService.onAddNewRow$.next(true) }




}  //########################################################################################################################################################
// ##########################################################################################################################################################



