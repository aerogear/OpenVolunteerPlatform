import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Disable lazy loading
import { HomePageModule } from './pages/home/home.module';

export function loadHomePageModule() {
  return HomePageModule;
}

import { NewItemPageModule } from './pages/new-item/new-item.module';

export function loadNewItemPageModule() {
  return NewItemPageModule;
}

import { UpdateItemPageModule } from './pages/update-item/update-item.module';

export function loadUpdateItemPageModule() {
  return UpdateItemPageModule;
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: loadHomePageModule },
  { path: 'new-item', loadChildren: loadNewItemPageModule },
  { path: 'update-item', loadChildren: loadUpdateItemPageModule },
];
@NgModule({
  imports: [
    HomePageModule,
    NewItemPageModule,
    UpdateItemPageModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
