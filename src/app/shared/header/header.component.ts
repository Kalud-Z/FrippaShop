import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/_services/auth.service';
import { environment } from 'src/environments/environment';
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




  clickedOutsideHeader() {
    // this.clickInsideHeader = false;
    this.synchUIService.clickInsideHeader$.next(false)
  }


  mouseEnterHeader() {
    setTimeout(() => {
      // this.clickInsideHeader = true;
    this.synchUIService.clickInsideHeader$.next(true)
    }, 20);
  }


  mouseLeaveHeader() {
    this.clickedOutsideHeader();
  }


  showFilter() {
    // if(this.clickInsideHeader) {
    //   this.showFilterCrl = true
    // }
    this.synchUIService.showFilter$.next(true)
  }


  onAddNewRow() {
    // if(this.currentUser === this.adminName && this.clickInsideHeader ) {
    //   console.log('we are now going to new task')
    //   this.router.navigate(['new-task'] , { relativeTo :  this.route } );
    // }
    this.synchUIService.onAddNewRow$.next(true)
  }




}  //########################################################################################################################################################
// ##########################################################################################################################################################



