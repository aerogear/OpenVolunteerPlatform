import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
import { ItemService } from '../../services/sync/item.service';
import { Task } from '../../services/sync/types';
import { NetworkService } from '../../services/network.service';
import { VoyagerService } from '../../services/sync/voyager.service';

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

  constructor(
    private router: Router,
    public itemService: ItemService,
    public networkService: NetworkService,
    public aerogear: VoyagerService
  ) { }

  async ngOnInit() {
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
      if (result) {
        console.log('Result from query', result);
        this.items = result.data && result.data.allTasks;
        this.loading = result.loading;
        this.errors = result.errors;
      }
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

  deleteItem(item) {
    this.itemService.deleteItem(item).then(result => {
      console.log('Result from delete mutation', result);
    });
  }
}

