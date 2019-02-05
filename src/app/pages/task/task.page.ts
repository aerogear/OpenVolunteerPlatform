import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
import { ItemService } from '../../services/sync/item.service';
import { Task } from '../../services/sync/types';
import { NetworkService } from '../../services/network.service';
import { VoyagerService } from '../../services/sync/voyager.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-task',
  templateUrl: 'task.page.html',
  styleUrls: ['task.page.scss'],
})

export class TaskPage implements OnInit {

  items: Array<Task>;
  online: boolean;
  queue: number;
  loading = true;
  errors: any;
  user: any = 'Login';

  constructor(
    private router: Router,
    public itemService: ItemService,
    public networkService: NetworkService,
    public aerogear: VoyagerService,
    public auth: AuthService
  ) { }

  async ngOnInit() {
    await this.initAuth();
    // Root element of the data app
    // When view is initialized:
    // We try to do network request first to get fresh data
    // Then we subscribe to any updates that happen in local cache
    // Local cache can be updated by mutations that happen on the app
    await this.loadData();
    await this.setupQueueStatusBar();
  }

  private initAuth() {
    // FIXME temporary disabled
    // return this.auth.init().then(() => {
    //   return this.auth.authService.extract().loadUserProfile().success((profile) => {
    //     this.user = profile.username;
    //   });
    // }).catch((error) => {
    //   if (error) {
    //     // tslint:disable-next-line:no-console
    //     console.info('Error when initializing auth', error);
    //   }
    // });
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
    this.aerogear.queueListener = {
      onOperationEnqueued() {
        self.queue = self.queue + 1;
      },
      queueCleared() {
        self.queue = 0;
      }
    };
    this.queue = 0;
  }

  private async loadData() {
    // Refresh cache first
    await this.itemService.refreshItems();
    // Subscribe to local cache changes
    this.itemService.getItems().subscribe(result => {
      console.log('Result from query', result);
      this.items = result.data && result.data.allTasks;
      this.loading = result.loading;
      this.errors = result.errors;
    }, error => {
      console.log('error from query', error);
      this.errors = error;
    });
  }

  openNewItemPage() {
    this.router.navigate(['/new-item']);
  }

  goToItem(item) {
    this.router.navigate(['/update-item', item]);
  }

  login() {
    if (this.auth.authService) {
      if (this.auth.authService.isAuthenticated()) {
        this.auth.authService.logout();
      } else {
        this.auth.authService.login();
      }
    }
  }

  deleteItem(item) {
    this.itemService.deleteItem(item).then(result => {
      console.log('Result from delete mutation', result);
    });
  }
}

