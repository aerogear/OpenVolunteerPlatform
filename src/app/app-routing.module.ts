import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TaskPageModule } from './pages/task/task.module';

export function loadTaskModule() {
  return TaskPageModule;
}

import { NewTaskPageModule } from './pages/new-task/new-task.module';

export function loadNewTaskPageModule() {
  return NewTaskPageModule;
}

import { UpdateTaskPageModule } from './pages/update-task/update-task.module';

export function loadUpdateTaskPageModule() {
  return UpdateTaskPageModule;
}

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadChildren: loadTaskModule },
  { path: 'new-task', loadChildren: loadNewTaskPageModule },
  { path: 'update-task', loadChildren: loadUpdateTaskPageModule },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'offline-queue', loadChildren: './pages/offline-queue/offline-queue.module#OfflineQueuePageModule' },
];
@NgModule({
  imports: [
    TaskPageModule,
    NewTaskPageModule,
    UpdateTaskPageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
