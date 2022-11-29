// @ts-ignore
// @ts-ignore

import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

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
}
