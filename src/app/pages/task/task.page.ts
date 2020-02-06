import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Router } from '@angular/router';
import { TaskService } from '../../services/sync/task.service';
import { Task } from '../../services/sync/types';
import { NetworkService } from '../../services/network.service';
import { VoyagerService } from '../../services/sync/voyager.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-page-task',
  templateUrl: 'task.page.html',
  styleUrls: ['task.page.scss'],
})

export class TaskPage implements OnInit {

  task: Task;
  tasks: Array<Task>;
  online: boolean;
  queue: number;
  errors: any;
  cases: { case: string; }[];
  selectedSegment = 'all';

  constructor(
    private router: Router,
    public taskService: TaskService,
    public networkService: NetworkService,
    public aerogear: VoyagerService,
    public toastController: ToastController,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {
    this.tasks = [];
    this.cases = [{ case: 'all' }, { case: 'open' }];
  }

  async ngOnInit() {
    await this.auth.initialized;
    // Root element of the data app
    // When view is initialized:
    // We try to do network request first to get fresh data
    // Then we subscribe to any updates that happen in local cache
    // Local cache can be updated by mutations that happen on the app
    await this.loadData();
    await this.setupQueueStatusBar();
  }

  // Setup status bar that shows online status
  private async setupQueueStatusBar() {
    this.online = !await this.networkService.networkInterface.isOffline();
    this.networkService.networkInterface.onStatusChangeListener({
      onStatusChange: (networkInfo) => {
        console.log(`Network state changed. Online: ${networkInfo.online}`);
        this.online = networkInfo.online;
      }
    });
    console.log(`Online: ${this.online}`);
    console.log(`NetworkStatus Provider: ${this.networkService.networkInterface.constructor.name}`);
    const self = this;
    this.aerogear.apolloClient.registerOfflineEventListener({
      onOperationEnqueued() {
        self.queue = self.queue + 1;
      },
      queueCleared() {
        self.queue = 0;
      },
      onOperationFailure: ({ op }) => {
        this.alertCtrl.create({
          message: `Failed to replicate offline change: ${op.context.operationName}`
        }).then((dialog) => {
          dialog.present();
        });
      }
    });
    this.queue = 0;
  }

  private async loadData() {
    // Refresh cache first
    await this.taskService.refreshTasks().catch(() => {
      this.presentToast('Cannot refresh tasks from server');
    });
    // Subscribe to local cache changes
    this.taskService.getTasks().subscribe(result => {
      if (result && !result.errors) {
        console.log('Result from query', result);
        this.tasks = result.data && result.data.allTasks;
      } else {
        console.log('error from query', result);
        this.presentToast('Cannot load data from cache');
      }
    }, error => {
      console.log('error from query', error);
      this.presentToast('Problem with listening to cache changes.');
    });
  }

  openNewTaskPage() {
    this.router.navigate(['/new-task']);
  }

  goToTask(task) {
    this.router.navigate(['/update-task', task]);
  }

  deleteTask(task) {
    this.taskService.deleteTask(task).then(result => {
      console.log('Result from delete mutation', result);
      this.presentToast('Task deleted');
    });
  }

  markTaskStatus(task) {
    let newValues;
    if (task.status === 'COMPLETE') {
      newValues = {
        ...task,
        status: 'OPEN'
      };
    } else {
      newValues = {
        ...task,
        status: 'COMPLETE'
      };
    }
    this.taskService.updateTask(newValues).then(result => {
      console.log('Result from server for mutation', result);
    }).catch((error) => {
      console.error(error);
    });
  }

  isChecked(task) {
    if (task.status === 'COMPLETE') {
      return true;
    }
    return false;
  }

  checkCase(itemCase, task) {
    if (itemCase.case === 'open') {
      if (task.status === 'OPEN') {
        return true;
      }
      return false;
    }
    return true;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

