import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Disable lazy loading
import { HomePageModule } from './pages/home/home.module';

export function loadHomePageModule() {
  return HomePageModule;
}

import { TaskPageModule } from './pages/task/task.module';

export function loadTaskModule() {
  return TaskPageModule;
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
  { path: 'tasks', loadChildren: loadTaskModule },
  { path: 'new-item', loadChildren: loadNewItemPageModule },
  { path: 'update-item', loadChildren: loadUpdateItemPageModule },
  { path: 'docs', loadChildren: './pages/docs/docs.module#DocsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'security', loadChildren: './pages/security/security.module#SecurityPageModule' },
  { path: 'files', loadChildren: './pages/files/files.module#FilesPageModule' },
];
@NgModule({
  imports: [
    HomePageModule,
    NewItemPageModule,
    UpdateItemPageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
