import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// #######################################################################################################################################################
export class SynchUIService {  //#########################################################################################################################
  constructor() { }

  isComponentLoading$ = new Subject<boolean>();

  clickInsideHeader$ = new Subject<boolean>();

  onAddNewRow$ = new Subject<boolean>();

  showFilter$ = new Subject<boolean>();
  
  showPopupView$ = new BehaviorSubject<boolean>(false);

  modifyEntryView : boolean ;



}  //#######################################################################################################################################################
// #########################################################################################################################################################

