import {Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {AvatarService} from '../../services/avatar.service';
import { AuthService } from 'src/app/services/auth.service';


const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  profile: any = null;
  pageTitle = 'Home';

  weatherTemp: any;
  cityName: any;
  uid: string = null;

    constructor(
      private authService: AuthService,
      private avatarService: AvatarService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      public httpClient: HttpClient,
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
  navegar(page){
    this.router.navigate(page);
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



  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    });
    await toast.present();
  }

  async alertPresent(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK'],
    });
    await alert.present();
  }


  loadData() {
    this.httpClient.get(`${API_URL}/weather?q=${'Santiago'}&appid=${API_KEY}`).subscribe(results => {
      console.log(results);
      this.weatherTemp = results['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
    });
    this.avatarService.getUserProfile().subscribe(respuesta => {
      this.profile = respuesta;
    });
  }

  async uploadAvatar(){
    const avatar = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    console.log(avatar);

    if(avatar){
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const respuesta = await this.avatarService.uploadAvatar(avatar);
      await loading.dismiss();

      if(respuesta){
        this.toastPresent('Avatar uploaded!!!');
      }
      else{
        this.alertPresent('Upload failed','Please try again!!!');
      }
    }
  }
  async logout(){
    await this.userService.logOut();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

}
