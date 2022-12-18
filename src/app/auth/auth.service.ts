import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { catchError, tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from  'rxjs';

import { Preferences } from '@capacitor/preferences';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  environment.uriAPI;
  authSubject  =  new  BehaviorSubject(false);
  userStorage:User;
  tokenExpire:any;

  constructor(private  httpClient:  HttpClient, private router: Router) { 
   
    this.isLoggedIn;
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      catchError(error => {
        
        if (error.status != 200) {
          // handle error
          return throwError(error);
        }
      })
    );
  }

  login(user: User): Observable<AuthResponse> {
    user.device_name = "deviceName";
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user)
    .pipe(
      catchError(error => {
        if (error.status != 200) {
          return throwError(error);
        }
      }),
      tap(async (res:AuthResponse) => {

        if (res.user) {
          console.log("res : " + JSON.stringify(res));
          
          await Preferences.set(
            {
              key: "ACCESS_TOKEN",
              value: res.access_token,
            });
          await Preferences.set(
            {
              key:"EXPIRES_IN",
              value: res.expired_at.toString(),
            });
          await Preferences.set(
            {
              key:"USER",
              value: JSON.stringify(res.user),
            });
          this.authSubject.next(true);
          this.router.navigateByUrl('/tabs', {replaceUrl:true});
        }
      })
    );
  }

  async logout() {
    await Preferences.remove({key:"ACCESS_TOKEN"});
    await Preferences.remove({key:"EXPIRES_IN"});
    this.authSubject.next(false);
  }

  isLoggedIn() {
    this.getDataStorage().then(()=>{
      this.tokenExpire = new Date(this.tokenExpire)
      let dateNow = new Date();
      if(this.userStorage != null && dateNow.getTime() < this.tokenExpire.getTime()){
        this.authSubject.next(true);

        return this.authSubject.asObservable();

      } else {
        this.authSubject.next(false);
        Preferences.clear();
      return this.authSubject.asObservable();
      }
    }
    )
  }

  async getDataStorage(){
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.tokenExpire = await (await Preferences.get({key: 'EXPIRES_IN'})).value;
    this.tokenExpire = await (await Preferences.get({key: 'EXPIRES_IN'})).value;
  }

  
  resetPassword(email: string): Observable<any> {
    return this.httpClient.post<string>(`${this.AUTH_SERVER_ADDRESS}/password/forgot-password`, email).pipe(
      catchError(error => {
        if (error.status != 200) {
          // handle error
          return throwError(error);
        }
      })
    );
  }
}


