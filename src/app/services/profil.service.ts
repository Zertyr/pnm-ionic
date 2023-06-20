import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../auth/user';

@Injectable({
  providedIn: 'root'
})

export class ProfilService {
  accessToken: any;

  constructor(private httpClient: HttpClient) { }

  /**
   * On fait un appel API pour l'update d'un utilisateur
   * @param user : UserInfo
   * @returns 
   */
  async updateUser(user:UserInfo): Promise<Observable<any>> {

    let url = environment.uriAPI + "/user/" + user.id;
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.httpClient.patch<UserInfo>(url , user , { headers });
  }

  /**
   * Delete current user account
   * @param user 
   * @returns 
   */
  async deleteUser(user) : Promise<Observable<any>>{
    let url = environment.uriAPI + "/user/" + user.id;
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.httpClient.delete<any>(url , { headers });
  }
}
