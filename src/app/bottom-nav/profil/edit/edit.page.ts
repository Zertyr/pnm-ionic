import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UserInfo } from 'src/app/auth/user';
import { ProfilService } from 'src/app/services/profil.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  user:any;
  editForm: FormGroup;
  isSubmitted = false;
  AUTH_SERVER_ADDRESS:  string  =  environment.uriAPI;
  formUpdate:boolean= false;
  accessToken: any;

  constructor(private profilService: ProfilService, private alertController: AlertController, private httpClient: HttpClient, public formBuilder: FormBuilder, private authService: AuthService) { }

  async ngOnInit() {
    this.initform();

    await this.getUserData().then(() => console.log("this.user : " + this.user));

      
    this.editForm.patchValue({
      name:this.user.name,
      firstname:this.user.firstname,
      lastname:this.user.lastname,
      email:this.user.email,
    })
  }
  
  initform(){
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

  async onEdit() {
    let name = this.editForm.get('name')?.value;
    let firstname = this.editForm.get('firstname')?.value;
    let lastname = this.editForm.get('lastname')?.value;
    let email = this.editForm.get('email')?.value;
    let password = this.editForm.get('password')?.value;
    let newpassword = this.editForm.get('newpassword')?.value;
    let newpassword2 = this.editForm.get('newpassword2')?.value;
    let updateUser: any = this.user;

    if(firstname !== undefined && firstname !== this.user.firstname){
      console.log("update firstname");
      
      updateUser.firstname = this.editForm.get('firstname')?.value;
      this.formUpdate = true;      
    }

    if(lastname !== undefined && lastname !== this.user.lastname){
      console.log("update lastname");
      
      updateUser.lastname = this.editForm.get('lastname')?.value;
      this.formUpdate = true;      
    }

    if(name !== undefined && name !== this.user.name){
      console.log("update name");

      updateUser.name = this.editForm.get('name')?.value;
      this.formUpdate = true;      

    }

    if(email !== undefined && email !== this.user.email){
      console.log("update email");

      updateUser.email = this.editForm.get('email')?.value;
      this.formUpdate = true;      

    }
    if(password !== undefined && password !== '' && newpassword !== undefined &&  newpassword !== '' && newpassword2!== undefined &&  newpassword2 !== '' && newpassword2 === newpassword ){
      if(newpassword2 !== undefined){
        let userEmail = email;
      console.log("req test mot de passe");
      console.log("this.user submit",this.user);
      var userlogin: any = {
        id: this.user.id,
        name : this.user?.name,
        email : email,
        password : password,
        device_name : 'deviceName'
      };
      this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, userlogin).subscribe(
        result => {
          updateUser.password = newpassword2;

          console.log("initialisation update avec changement mdp");

          this.update(updateUser);
          
        },async (err) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'your current password don\'t match',
            buttons: ['OK'],
          });
      
          return alert.present();
        }
      )
      } else {
        console.log('what is the fuck');
        
        this.update(updateUser);
      }
    } else {
      if(this.formUpdate === true )
      {
        console.log("init update without change mdp");
        return this.update(updateUser);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'nothing has changed',
          buttons: ['OK'],
        });
    
        return alert.present();
      }
    }

  }

  async getUserData(){
    return await Preferences.get({key: 'USER'}).then(data => {
      this.user = JSON.parse(data.value);
      console.log(JSON.stringify(this.user));
    });
  }
  
  async update(updateUser){
    console.log('in updateUser');
    
    this.profilService.updateUser(updateUser).then(
     async result => {
        result.subscribe()
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Update succesfull',
          buttons: ['OK'],
        });
    
        alert.present().then(()=>this.authService.logout());
      },
      async (err)=>{
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'An error was encounter during the update',
          buttons: ['OK'],
        });
        return alert.present();
      }
    );
  }
}
