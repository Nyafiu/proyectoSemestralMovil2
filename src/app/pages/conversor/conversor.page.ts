import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

  pageTitle: 'Conversor';
  valordolar: any;
  valoreuro: any;
  pesosuno = 0;
  pesosdos = 0;
  resultadodolar = 0;
  resultadoeuro = 0;

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
    this.resultadodolar = this.pesosuno / this.valordolar.valor;
    return this.resultadodolar;
  }
  convertireuro(){
    this.resultadoeuro = this.pesosdos / this.valoreuro.valor;
    return this.resultadoeuro;
  }
  ngOnInit() {}
}
