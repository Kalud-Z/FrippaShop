import { Component, OnInit, OnDestroy } from '@angular/core';
import { popupWindowTrigger } from '../_animations/animations';
import { SynchUIService } from 'src/app/_services/synch-ui.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-are-you-sure-you-wanna-exit',
  templateUrl: './are-you-sure-you-wanna-exit.component.html',
  styleUrls: ['./are-you-sure-you-wanna-exit.component.scss'],
  animations : [
    popupWindowTrigger
  ]
})

// #########################################################################################################################################################
export class AreYouSureYouWannaExitComponent implements OnInit { //#########################################################################################
  popupView = false;

  constructor(private synchUIService : SynchUIService,
              private router : Router,
              private route : ActivatedRoute,
              ) { }


  ngOnInit() {
    this.synchUIService.showPopupViewSubject.subscribe(data => { this.popupView = data  })
  }


  onPopupYes() {
    if(this.synchUIService.modifyEntryView) {
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    } else {
      this.router.navigate(['../'] , { relativeTo :  this.route } );
    }
    this.synchUIService.showPopupViewSubject.next(false);
  }

  onPopupNo() { this.popupView = false }




}  //#####################################################################################################################################################
// #######################################################################################################################################################
