import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// #######################################################################################################################################################
export class SynchUIService {  //#########################################################################################################################
  constructor() { }

  isComponentLoadingSubject = new Subject<boolean>();

  clickInsideHeaderSubject = new Subject<boolean>();

  onAddNewRowSubject = new Subject<boolean>();

  showFilterSubject = new Subject<boolean>();
  
  showPopupViewSubject = new BehaviorSubject<boolean>(false);

  modifyEntryView : boolean ;



}  //#######################################################################################################################################################
// #########################################################################################################################################################

