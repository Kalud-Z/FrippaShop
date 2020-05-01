import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../tasks/services/data-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { //#####################################################################
// AIzaSyDIVA6P44Okinr0qT4z9XzJCpzX1qRDuwo
  // @ViewChild('emailInput' , { static : true }) emailInput;
  userSub : Subscription;
  token : string;
  id : string;

  currentUserName : string;
  currentUserEmail : string;
  initialEmail : string;

  isLoading = false;



  constructor(private authService: AuthService,
              private router : Router,
              private dataStorageService : DataStorageService
              ) { }

 
  ngOnInit(): void {
    // this.authService.autoLogin();
  }



  onSubmit(loginForm : NgForm) {
    const email    = loginForm.value.email;
    const password = loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email , password).subscribe(data => {
      this.isLoading = false;
      
      if(data.email === environment.ahmedEmail) {
        this.authService.currentUserName = environment.ahmedName;
      } 
      
      if(data.email === environment.khaledEmail) {
        this.authService.currentUserName = environment.khaledName;
      } 
      
      
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



}  //class ########################################################################################################
