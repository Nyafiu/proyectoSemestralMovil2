import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user.service';
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
    { title: 'Perfil', url: '/perfil', icon: 'person'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private userService: UserService,
    private router: Router,
    public menuCtrl: MenuController) {}
  
  async logout(){
    await this.userService.logOut();
    this.router.navigateByUrl('/', {replaceUrl: true});
    this.menuCtrl.close();
  }

}
