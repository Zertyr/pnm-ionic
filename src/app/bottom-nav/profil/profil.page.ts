import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/auth.service';

interface User {
  name: string;
  firstname: string;
  lastname: string;
  email: string;
}

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})

export class ProfilPage implements OnInit {

  user:User;

  constructor(private authService: AuthService) {}

  ngOnInit():void {

    console.log(JSON.stringify("this.user onInit: " + this.user));
    
  }


  async logout(){
   await this.authService.logout();
  }
  async ionViewWillEnter() {

    await this.getUserData().then(() => console.log("this.user : " + this.user));
    
    
}
  async getUserData(){
    return await Preferences.get({key: 'USER'}).then(data => {
      this.user = JSON.parse(data.value);
      console.log(JSON.stringify(this.user));

    });
  }
}
