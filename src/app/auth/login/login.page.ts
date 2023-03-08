import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async login(form){
    await this.authService.login(form.value).subscribe({
      next: (value: any) => {
        console.log('res');
        console.log(value);


       },
      error: async (error: any) => { 
        if(error.error.message){
            const alert = await this.alertController.create({
              header: 'Error',
              message: error.error.message,
              buttons: ['OK'],
              cssClass: 'modalMessage'
            });
          return alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'server error',
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
