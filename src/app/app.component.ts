import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'About', url: '/about', icon: 'people'},
    { title: 'Conversor', url: '/conversor', icon: 'attach'},
    { title: 'Formulario', url: '/formulario', icon: 'clipboard'},
    { title: 'Cerrar sesión', url: '/', icon: 'log-out'}
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
