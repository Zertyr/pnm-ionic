import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  checking = false;
  constructor(private  authService:  AuthService, private  router:  Router, private alertController: AlertController) { }

  async register(form) {
    console.log('box',this.checking)
    if(this.checking === true){

      this.authService.register(form.value)
      .subscribe({
        next: (value: any) => {
          console.log('res');
          console.log(value);
         },
        error: async (error: any) => { 
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Email déjà utilisé ',
            buttons: ['OK'],
            cssClass: 'modalMessage'
          });
      
          return alert.present();
        },
        complete: async () => { 
          const alert = await this.alertController.create({
            header: 'Succès',
            message: 'Compte créé avec succès !',
            buttons: ['OK'],
            cssClass: 'modalMessage'
          });
      
          await alert.present();
          this.router.navigateByUrl('login');
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Vous devez accepter les termes et conditions ',
        buttons: ['OK'],
        cssClass: 'modalMessage'
      });
  
      return alert.present();
    }
  }

  changeChecking(){
    this.checking = !this.checking;
  }
}
