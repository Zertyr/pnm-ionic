import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilService } from 'src/app/services/profil.service';

//TODO : faire un fichier interface si un dossier pour les models est créé
interface User {
  id: number,
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

  constructor(private authService: AuthService, private profilService: ProfilService, private alertController: AlertController) {}

  ngOnInit():void {
  }


  //on appelle la fonction logout du authService pour se déconnecter
  async logout(){
   return await this.authService.logout();
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

  /**
   * delete user
   */
  async deleteUser(){
    //alert confirmation delete
    const alert = await this.alertController.create({
      header: 'Confirm delete',
      message: 'Do you really want to delete your account ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            (await this.profilService.deleteUser(this.user)).subscribe( async()=> {
              //alert delete success
              const alertSuccess = await this.alertController.create({
                header: 'Success',
                message: 'Delete succesfull',
                buttons: ['OK'],
              });
      
              return alertSuccess.present().then(() => this.authService.logout());
              });
          }
        }
      ]
    });
    alert.present()
  }
}
