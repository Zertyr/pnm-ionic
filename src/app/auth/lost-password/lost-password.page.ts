import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {

  constructor(private  authService:  AuthService, private alertController: AlertController, private  router:  Router) { }

  ngOnInit() {
  }

  async LostPassword(form){
    await this.authService.resetPassword(form.value).subscribe({
      next: (value: any) => {
        console.log('res');
        console.log(value);


       },
      error: async (error: any) => { 
        const alert = await this.alertController.create({
          header: 'Erreur',
          message: 'Impossible d\'envoyer l\'email',
          buttons: ['OK'],
          cssClass: 'modalMessage'
        });
    
        return alert.present();
      },
      complete: async () => { 
        const alert = await this.alertController.create({
          header: 'Succès',
          message: 'Email envoyé',
          buttons: ['OK'],
          cssClass: 'modalMessage'
        });
    
        await alert.present();
        this.router.navigateByUrl('login');
      }
    })
  }
}
