import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConductorPageRoutingModule } from './conductor-routing.module';
import { ConductorPage } from './conductor.page';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ConductorPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConductorPage
      }
  ])
  ],
  declarations: [ConductorPage]
})
export class ConductorPageModule {}
