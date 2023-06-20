import { Component } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private  authService:  AuthService, private  router:  Router, private alertController: AlertController) { }

  async login(form){
    await this.authService.login(form.value).subscribe({
      next: (value: any) => {
        console.log('res');
        console.log(value);


       },
      error: async (error: any) => { 
        if(error.error.message){
            const alert = await this.alertController.create({
              header: 'Erreur',
              message: error.error.message,
              buttons: ['OK'],
              cssClass: 'modalMessage'
            });
          return alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Erreur',
            message: 'Erreur de communication au serveur',
            buttons: ['OK'],
            cssClass: 'modalMessage'
          });
        return alert.present();
        }
      },
      complete:  () => { 
      }
    })
  }
}
