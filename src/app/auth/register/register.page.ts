import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router, private alertController: AlertController) { }

  ngOnInit() {
  }
  
  async register(form) {
      this.authService.register(form.value)
      .subscribe({
        next: (value: any) => {
          console.log('res');
          console.log(value);


         },
        error: async (error: any) => { 
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'L\'email est déjà utilisé !',
            buttons: ['OK'],
          });
      
          return alert.present();
        },
        complete: async () => { 
          const alert = await this.alertController.create({
            header: 'Succès',
            message: 'Le compte a était créé avec succès',
            buttons: ['OK'],
          });
      
          await alert.present();
          this.router.navigateByUrl('login');
        }
      });
  }
}
