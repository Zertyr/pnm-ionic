import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router){

  }
  canLoad(): Observable<boolean> {
    console.log(this.authService.authSubject);
    
    return this.authService.authSubject.pipe(      
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        
        console.log('Found previous token, automatic login');
        console.log(isAuthenticated);
        if(isAuthenticated){
          this.router.navigateByUrl('/tabs', {replaceUrl:true});
        }else {
          return true;
        }
      })
    )
  }
}
