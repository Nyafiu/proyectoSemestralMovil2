import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastCtrl: ToastController, private router:Router, private loadingCtrl:LoadingController) { }


  pageTitle = 'Login';
  isNotHome = false;
  sideMenu = false;
  loading: HTMLIonLoadingElement;

  ngOnInit() {
    this.cargarLoading('Bienvenido');
    console.log('ngOnInit');
  }

  cargarLoading(message:string){
    this.presentLoading('<img src="../../../assets/img/logo1.png">');

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }

  async presentLoading(message:string){
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }

  user:any = 
  {
    email:'',
    password:''
  }
  

  field:string = '';

  login(){
    if(this.validarModelo(this.user)){
      this.presentToast('Bienvenido ' + this.user.email);
      this.router.navigate(['/home']);
    }
    this.presentToast('Debes ingresar: ' + this.field)
  }

  validarModelo(model:any){
    for(var[key,value] of Object.entries(model)){
      if(value == ''){
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(message:string, duration?:number) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration?duration:2000,
      position: 'bottom'
    });
    await toast.present();
  }

}
