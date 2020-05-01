import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {  //###########################################################################

  constructor(private authService : AuthService, private router : Router ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.authService.userSubject.pipe(map(user => {
       console.log('im in guard')
       console.log('this is the user' , user)
       if(!!user === true) {return true}
       else {
        return this.router.createUrlTree(['/login']);
       }
     }))

    // return true;
    
  }


} //class ###############################################################################################################################
  
  // 