import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DeviceTrustPage } from './devicetrust.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceTrustPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceTrustPage]
})
export class DeviceTrustPageModule {}
