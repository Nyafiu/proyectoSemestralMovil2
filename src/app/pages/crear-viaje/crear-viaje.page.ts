import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  datos: any = {
    destino : '',
    ruta : '',
    patente : '',
    valor : '',
    descripcion : ''
  };

  constructor(private router: Router, public alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
  }

  validarFormulario(){
    if (this.datos.destino!='' && this.datos.patente!='' && this.datos.valor!='' && this.datos.descripcion!='') {
      this.generaViaje();
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debes rellenar todos los campos',
      position: 'bottom',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async generaViaje(){
    localStorage.setItem('destino',this.datos.destino);
    localStorage.setItem('patente',this.datos.patente);
    localStorage.setItem('valor',this.datos.valor);
    localStorage.setItem('descripcion',this.datos.descripcion);
    const alert = await this.alertController.create({
      message: 'El viaje se registró correctamente',
      buttons: [{
        text: 'Aceptar',
        handler: () => {this.router.navigate(['/conductor']),
        this.limpiarFormulario();;}
      }]
    });
    await alert.present();
  }

  limpiarFormulario(){
    console.log("formulario borrado");
    this.datos.reset;
  }
}
