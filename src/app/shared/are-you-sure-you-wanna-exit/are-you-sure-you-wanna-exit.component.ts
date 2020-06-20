import { Component, OnInit, OnDestroy } from '@angular/core';
import { popupWindowTrigger } from '../_animations/animations';
import { SynchUIService } from 'src/app/_services/synch-ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  destroy$ = new Subject<boolean>();

  constructor(private synchUIService : SynchUIService,
              private router : Router,
              private route : ActivatedRoute,
              ) { }


  ngOnInit() {
    this.synchUIService.showPopupView$.pipe(takeUntil(this.destroy$)).subscribe(data => { this.popupView = data })
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onPopupYes() {
    if(this.synchUIService.modifyEntryView) {
      this.router.navigate(['../../'] , { relativeTo :  this.route });
    } else {
      this.router.navigate(['../'] , { relativeTo :  this.route } );
    }
    this.synchUIService.showPopupView$.next(false);
  }


  onPopupNo() { this.popupView = false }


}  //#####################################################################################################################################################
// #######################################################################################################################################################
