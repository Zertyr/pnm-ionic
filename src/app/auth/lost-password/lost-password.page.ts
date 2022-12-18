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
          header: 'Error',
          message: 'Cannot send email',
          buttons: ['OK'],
        });
    
        return alert.present();
      },
      complete: async () => { 
        const alert = await this.alertController.create({
          header: 'Succès',
          message: 'Email send',
          buttons: ['OK'],
        });
    
        await alert.present();
        this.router.navigateByUrl('login');
      }
    })
  }
}
