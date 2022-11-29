import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private router:Router, 
    private loadingCtrl:LoadingController,
    private userService: UserService,
    ) { }


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
    this.showLoading();
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando Sesion...',
      duration: 1000,
    });

    loading.present();
  }

  onSubmit(){
    this.userService.login(this.user).then(res => {
      this.router.navigate(['/home']);
    }).catch(err => {
      this.presentToast(err.message);
    });
  }

}
