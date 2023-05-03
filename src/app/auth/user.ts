export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    device_name: string;
}

export class UserClass {
    id: number;
    name: string;
    email: string;
    password: string;
    device_name: string;

    constructor(_name:string = null,_email:string= null,_password:string= null,_device_name:string= null){
        this.id = 1;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.device_name = _device_name;
    }
}

export interface UserInfo {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    password: string
  }