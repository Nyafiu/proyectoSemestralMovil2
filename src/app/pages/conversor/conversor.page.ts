import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

  pageTitle: 'Conversor';
  valordolar: any;
  valoreuro: any;
  pesos = 0;
  resultado = 0;

  constructor(public httpClient: HttpClient,) {
    this.loadData();
  }
      loadData() {
    this.httpClient.get('https://mindicador.cl/api').subscribe((respuesta) => {
      console.log(respuesta);
      this.valordolar = respuesta['dolar'];
      this.valoreuro = respuesta['euro'];
    });
  }
    convertirdolar(){
    this.resultado = this.pesos / this.valordolar.valor;
    return this.resultado;
  }
  convertireuro(){
    this.resultado = this.pesos / this.valoreuro.valor;
    return this.resultado;
  }
  ngOnInit() {}
}
