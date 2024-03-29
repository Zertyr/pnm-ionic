import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilService } from 'src/app/services/profil.service';

//faire un fichier interface si un dossier pour les models est créé
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

export class ProfilPage {
  user:User;

  constructor(private authService: AuthService, private profilService: ProfilService, private alertController: AlertController) {}

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
      header: 'Confirmation suppression',
      message: 'Voulez-vous réellement supprimer votre compte ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui',
          handler: async () => {
            (await this.profilService.deleteUser(this.user)).subscribe( async()=> {
              //alert delete success
              const alertSuccess = await this.alertController.create({
                header: 'Succès',
                message: 'Supprimer avec succès',
                buttons: ['OK'],
              });
      
              return alertSuccess.present().then(() => this.authService.logout());
              });
          }
        }
      ],
      cssClass: 'modalMessage'
    });
    alert.present()
  }
}
