import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastCtrl: ToastController, private router:Router, private menuCtrl:MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  pageTitle = 'Login';
  isNotHome = false;
  sideMenu = false;

  ngOnInit() {
  }


  user:any = [
  {
    email:'user@gmail.com',
    password:'user'
  },
  {
    email:'admin@gmail.com',
    password:'admin'
  }
  ]

  field:string = '';

  login(){
    if(this.validateModel(this.user)){
      this.presentToast('Bienvenido ' + this.user.email);
      this.router.navigate(['/home']);
    }
    else{
      this.presentToast('Debes ingresar: ' + this.field);
    }
  }

  validateModel (model: any) {
    for(var[key,value] of Object.entries(model)){
      if(value == ''){
        this.field = key;
        return false;
      }
    }
    return true;
  
  }
  
  async presentToast(messaje:string, duration?:number){
    const toast = await this.toastCtrl.create({
      message: messaje,
      duration: duration?duration:2000
    });
    toast.present();
  }
}
