import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  formulario: FormGroup;
  uid: string = null;

  constructor(private userServices: UserService,
    private loadingCtrl: LoadingController,
    private router: Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      edad: new FormControl(),
      genero: new FormControl(),
      correo: new FormControl(),
      marcaAuto: new FormControl(),
      modeloAuto: new FormControl(),
      patenteAuto: new FormControl(),
      foto: new FormControl(),
      uid: new FormControl(this.uid)
    });
   }

  async ngOnInit() {
    this.getUid();
  }

  async onSubmit(){
    console.log(this.formulario.value);
    const response = await this.userServices.addPlace(this.formulario.value);
    this.showLoading();
    console.log(response);
    this.formulario.reset();
  }

  async getUid() {
    const uid = await this.userServices.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid = ',this.uid);
    } else {
      console.log('No existe uid');
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'El formulario se ha enviado correctamente',
      duration: 2000,
    });

    loading.present();
  }

}
