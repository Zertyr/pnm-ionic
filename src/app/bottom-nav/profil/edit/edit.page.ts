import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilService } from 'src/app/services/profil.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  user: any;
  editForm: FormGroup;
  isSubmitted = false;
  AUTH_SERVER_ADDRESS: string = environment.uriAPI;
  formUpdate: boolean = false;
  accessToken: any;

  constructor(private profilService: ProfilService, private alertController: AlertController, private httpClient: HttpClient, public formBuilder: FormBuilder, private authService: AuthService) { }

  async ngOnInit() {

    //J'initialise le formulaire
    this.initform();


    //On récupère les valeurs stocké dans le storage
    await this.getUserData().then(() => console.log("this.user : " + this.user));

    //On applique les valuer déjà stocké dans le storage
    this.editForm.patchValue({
      name: this.user?.name,
      firstname: this.user?.firstname,
      lastname: this.user?.lastname,
      email: this.user?.email,
    })
  }

  /**
   * Permet d'initialiser le formulaire
   */
  initform() {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.minLength(2)]],
      firstname: ['', [Validators.minLength(2)]],
      lastname: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      newpassword: ['', [Validators.minLength(6)]],
      newpassword2: ['', [Validators.minLength(6)]]

    });
  }


  /**
   * Permet d'envoyé le formulaire et de faire les différents check préalable
   * @returns une alert
   */
  async onSubmit() {

    //On récupère les valeurs du formulaire qu'on utiliseras plus tard
    let name = this.editForm.get('name')?.value;
    let firstname = this.editForm.get('firstname')?.value;
    let lastname = this.editForm.get('lastname')?.value;
    let email = this.editForm.get('email')?.value;
    let password = this.editForm.get('password')?.value;
    let newpassword = this.editForm.get('newpassword')?.value;
    let newpassword2 = this.editForm.get('newpassword2')?.value;

    //on applique par défaut les info du storage dans le updateUser
    let updateUser: any = this.user;

    //On check si le firstname a était modifié
    if (firstname !== undefined && firstname !== this.user.firstname) {
      console.log("update firstname");

      updateUser.firstname = this.editForm.get('firstname')?.value;
      this.formUpdate = true;
    }

    //On check si le lastname a était modifié
    if (lastname !== undefined && lastname !== this.user.lastname) {
      console.log("update lastname");

      updateUser.lastname = this.editForm.get('lastname')?.value;
      this.formUpdate = true;
    }

    //On check si le name a était modifié
    if (name !== undefined && name !== this.user.name) {
      console.log("update name");

      updateUser.name = this.editForm.get('name')?.value;
      this.formUpdate = true;

    }

    //On check si l'email a était modifié
    if (email !== undefined && email !== this.user.email) {
      console.log("update email");

      updateUser.email = this.editForm.get('email')?.value;
      this.formUpdate = true;
    }

    //On fait les checks concernant le mot de passe (déjà si il est présent pour l'update)
    if (password !== undefined && password !== '' && newpassword !== undefined && newpassword !== '' && newpassword2 !== undefined && newpassword2 !== '' && newpassword2 === newpassword) {
      console.log("req test mot de passe");
      console.log("this.user submit", this.user);

      //On crée la variable qui va passer les info pour la connexion
      let userlogin: any = {
        id: this.user.id,
        name: this.user?.name,
        email: email,
        password: password,
        device_name: 'deviceName'
      };

      //On fait un test de connexion pour savoir si l'ancien mot de passe correspond
      this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, userlogin).subscribe(
        (result) => {
          updateUser.password = newpassword2;

          //initialisation update avec changement mdp
          this.update(updateUser);

        }, async (err) => {

          //Si erreur ça veut dire que l'ancien mot de passe ne correspond pas
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'your current password don\'t match',
            buttons: ['OK'],
            cssClass: 'modalMessage'
          });

          return alert.present();
        }
      )
    } else {
      //Si il y a eu au moins un changement la valeur est à true
      if (this.formUpdate === true) {
        //init update without change mdp
        return this.update(updateUser);
      } else {

        //Si erreur ça veut dire que rien n'a était changé
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'nothing has changed',
          buttons: ['OK'],
          cssClass: 'modalMessage'
        });

        return alert.present();
      }
    }

  }

  /**
   * Fonction pour récupérer les info dans le storage
   * @returns UserInfo
   */
  async getUserData() {
    return await Preferences.get({ key: 'USER' }).then(data => {
      if(data){
        this.user = JSON.parse(data.value);
      }
    });
  }

  /**
   * Fonction pour appelé l'update dans le service et renvoyé une erreur ou un succès
   * @param updateUser 
   * @return alert 
   */
  async update(updateUser) {
    console.log('in updateUser');

    this.profilService.updateUser(updateUser).then(
      async result => {
        result.subscribe()
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Update succesfull',
          buttons: ['OK'],
          cssClass: 'modalMessage'
        });

        return alert.present().then(() => this.authService.logout());
      },
      async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'An error was encounter during the update',
          buttons: ['OK'],
          cssClass: 'modalMessage'
        });
        return alert.present();
      }
    );
  }
}
