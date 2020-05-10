import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

import { throwError, observable, Subject, BehaviorSubject } from 'rxjs';
import { UserSubject } from './userSubject.model';
import { environment } from 'src/environments/environment';


interface loginReturnObj {
  kind: string,
  idToken: string,
  email: string,
  displayName: string,
  refreshToken: string,
  expiresIn: string,
  localId:string,
  registered: boolean
}



@Injectable({
  providedIn: 'root'
})
// ########################################################################################################################
export class AuthService { //##############################################################################################
  token : string;
  currentUserName : string;  
  userSubject = new BehaviorSubject<UserSubject>(null);
 
  constructor(private http: HttpClient, private router: Router) { }
    
  login(email : string , password: string) {
    return this.http.post<loginReturnObj>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
    {
      email             : email,
      password          : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError)
      ,tap(data => {
        this.handleAuthentication(data.email , data.localId , data.idToken , +data.expiresIn);
      }));
  
  } //login()#############

  logout() {
    // console.log('we re on logout')
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }
 


autoLogin() {
  const userData = JSON.parse(localStorage.getItem('userData'));  //this is how you retrieve data from the local storage
  if(!userData) { return }
  const loadedUser = new UserSubject(userData.email, userData.id , userData._token , new Date(userData._tokenExpDate));
  if(loadedUser.token) {
      this.userSubject.next(loadedUser);

      if(loadedUser.email === environment.ahmedEmail) {
        this.currentUserName = environment.ahmedName;
      } 
      
      if(loadedUser.email === environment.khaledEmail) {
        this.currentUserName = environment.khaledName;
      } 
  } 
} 



// #########################################################   PRIVATE METHODS #########################################################################

private handleError(errorResponse : HttpErrorResponse) {
  let errorMessage = 'An unknown error occured !';
  if(!errorResponse.error || !errorResponse.error.error) { return throwError(errorMessage) }
  switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS'  : errorMessage = 'Error : Email already in use by another account !!'; break;
      case 'EMAIL_NOT_FOUND'  : errorMessage = 'Error : Email is not registered' ; break;
      case 'INVALID_PASSWORD'  : errorMessage = 'Error : Password is incorrect !!' ; break;
      case 'USER_DISABLED'  : errorMessage = 'Error : Account is disabled!!' ; break;
  } 
  return throwError(errorMessage);   //RxJS throwError operato
}  //handleError


private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(new Date().getTime() + expiresIn*1000); // new Date(X milliseconds)

  const user = new UserSubject(email, userId , token , expirationDate);
  this.userSubject.next(user);
  // console.log(expirationDate);

  localStorage.setItem('userData', JSON.stringify(user)) //converts a js object into a string.
}






} //class #########################################################################################################################################
// ################################################################################################################################################




