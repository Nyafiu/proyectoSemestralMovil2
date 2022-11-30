import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  
  formulario: FormGroup;

  constructor(private userServices: UserService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      edad: new FormControl(),
      genero: new FormControl(),
      correo: new FormControl(),
      marcaAuto: new FormControl(),
      modeloAuto: new FormControl(),
      patenteAuto: new FormControl(),
      foto: new FormControl()
    })
   }

  ngOnInit() {
  }

  async onSubmit(){
    console.log(this.formulario.value)
    const response = await this.userServices.addPlace(this.formulario.value)
    console.log(response);
  }

}
