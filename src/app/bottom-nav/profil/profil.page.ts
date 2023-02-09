import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/auth.service';

//TODO : faire un fichier interface si un dossier pour les models est créé
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
  }


  //on appelle la fonction logout du authService pour se déconnecter
  async logout(){
   await this.authService.logout();
  }

  //se place après le ngOnInit, mauvaise pratique de mettre le ngOnInit en asynchrone
  async ionViewWillEnter() {
    await this.getUserData().then(() => console.log("profil loaded"));
  }

  //Pour récupérer les données de l'utilisateur
  async getUserData(){
    return await Preferences.get({key: 'USER'}).then(data => {
      this.user = JSON.parse(data.value);
    });
  }
}
