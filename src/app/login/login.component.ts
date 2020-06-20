import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from './_services/auth.service';
import { environment } from 'src/environments/environment';

import { routeSlideStateTrigger } from '../shared/_animations/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    routeSlideStateTrigger
  ]
})

// #############################################################################################################################################################
export class LoginComponent  { //##############################################################################################################
  @HostBinding('@routeSlideState') routeAnimation = true;

  token : string;
  id : string;

  currentUserName : string;
  currentUserEmail : string;
  initialEmail : string;

  isLoading = false;

  constructor(private authService: AuthService, private router : Router) { }

 
  onSubmit(loginForm : NgForm) {
    const email    = loginForm.value.email;
    const password = loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email , password).subscribe(data => {
      this.isLoading = false;
      if(data.email === environment.ahmedEmail) { this.authService.currentUserName = environment.ahmedName } 
      if(data.email === environment.khaledEmail) { this.authService.currentUserName = environment.khaledName } 
      this.router.navigate(['/tasks']);
    } , errorMessage => {
        this.isLoading = false;
        alert(errorMessage);
    } );  //handling error.
  
  }  // onSubmit()


  ahmedLogin() {
    this.currentUserEmail = environment.ahmedEmail;
    this.currentUserName = 'ahmed';
  }

  khaledLogin() {
    this.currentUserEmail = environment.khaledEmail;
    this.currentUserName = 'khaled';
  }

  ngDoCheck() {
    if(this.currentUserEmail) {
      this.initialEmail = this.currentUserEmail;
    }
  }


}  //class #################################################################################################################################################
