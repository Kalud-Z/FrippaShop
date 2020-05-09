import { Component, OnInit, HostBinding } from '@angular/core';
import { routeSlideStateTrigger } from '../shared/animations';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations : [
    routeSlideStateTrigger
  ]
})
export class TransactionsComponent implements OnInit {
  
  @HostBinding('@routeSlideState') routeAnimation = true;


  constructor() { }

  ngOnInit(): void {
  }

}
