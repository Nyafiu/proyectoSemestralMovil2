import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router:Router, 
    private loadingCtrl:LoadingController,
    private userService: UserService,
    ) { }


  sideMenu = false;
  loading: HTMLIonLoadingElement;

  ngOnInit() {
    this.cargarLoading('Bienvenido');
    console.log('ngOnInit');
    this.createForm();
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

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.userService.login(this.form.value.email, this.form.value.password);
    await loading.dismiss();

    if(user){
      this.showLoading();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.presentToast('Usuario o contraseña incorrectos');
    }
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
      message: 'Iniciando Sesión...',
      duration: 1000,
    });

    loading.present();
  }

}
