// @ts-ignore
// @ts-ignore

import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
  userService: UserService;
  router: Router;
  
    constructor(public httpClient: HttpClient) {
      this.loadData();
    }

    loadData(){
      this.httpClient.get(`${API_URL}/weather?q=${'Santiago'}&appid=${API_KEY}`).subscribe(results => {
        console.log(results);
        this.weatherTemp = results['main'];
        this.cityName = results['name'];
        console.log(this.weatherTemp);
      });
  }

  async logout(){
    await this.userService.logOut();
    this.router.navigateByUrl('/',{replaceUrl:true})
  } 

}
