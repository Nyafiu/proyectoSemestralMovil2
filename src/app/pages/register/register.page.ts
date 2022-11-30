import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formReg!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.createForm();
  }


  createForm(){
    this.formReg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.userService.register(this.formReg.value.email, this.formReg.value.password);
    await loading.dismiss();

    if(user){
      this.presentToast('Usuario registrado correctamente');
      this.showLoading();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.presentToast('Falló el registro. Intente nuevamente');
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
      message: 'Registrando usuario e ingresando...',
      duration: 2000,
    });

    loading.present();
  }

}
