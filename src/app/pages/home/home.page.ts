// @ts-ignore
// @ts-ignore

import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormularioPageModule } from '../formulario/formulario.module';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'Home';

  weatherTemp: any;
  cityName: any;
  valordolar: any;
  valoreuro: any;
  pesos = 0;
  resultado = 0;
  uid: string = null;

    constructor(public httpClient: HttpClient,
      private userService: UserService,
      private router: Router) {
      this.loadData();
    }

  async ngOnInit() {
    /*
    this.userService.getPlaces().subscribe((places) => {
      console.log(places);
    });*/
    this.getUid();
    
  }

  async getUid() {
    const uid = await this.userService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid = ',this.uid);
    } else {
      console.log('No existe uid');
    }
  }

  /*
  getInfoUser() {
    const path = 'Places'
  }
  */

  loadData() {
    this.httpClient.get(`${API_URL}/weather?q=${'Santiago'}&appid=${API_KEY}`).subscribe(results => {
      console.log(results);
      this.weatherTemp = results['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
    });
    this.httpClient.get('https://mindicador.cl/api').subscribe((respuesta) => {
      console.log(respuesta);
      this.valordolar = respuesta['dolar'];
      this.valoreuro = respuesta['euro'];
    });
  }

  async logout(){
    await this.userService.logOut();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  convertir(){
    this.resultado = this.pesos / this.valordolar.valor;
    return this.resultado;
  }

}
