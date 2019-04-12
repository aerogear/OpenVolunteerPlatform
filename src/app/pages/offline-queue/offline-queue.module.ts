import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfflineQueuePage } from './offline-queue.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineQueuePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfflineQueuePage]
})
export class OfflineQueuePageModule {}
