import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner-login',
  templateUrl: './loading-spinner-login.component.html',
  styleUrls: ['./loading-spinner-login.component.scss']
})
export class LoadingSpinnerLoginComponent implements OnInit {

  @Input() loadingType: string;

  fetchingMessage : string;
  savingMessage   : string;

  constructor() { }

  ngOnInit(): void {
    if(this.loadingType === 'fetch') { this.fetchingMessage = 'Fetching Data';}
    if(this.loadingType === 'save')  { this.fetchingMessage = 'Saving Data';}
  }

}
