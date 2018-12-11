import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Task } from '../../services/types';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<Task>;
  online: boolean;
  queue: number;
  loading = true;
  errors: any;

  constructor(
    private router: Router,
    public itemService: ItemService,
    public networkService: NetworkService
  ) { }

  ngOnInit() {
    this.itemService.getItems().then(result => {
      console.log('Result from query', result);
      this.items = result.data && result.data.allTasks;
      this.loading = result.loading;
      this.errors = result.errors;
    }, error => {
      console.log('error from query', error);
      this.errors = error;
    });
    this.itemService.subscribeToNew(result => {
      if (result.data && result.data.taskCreated) {
        this.items.push(result.data.taskCreated);
      }
    });
    this.itemService.subscribeToUpdate(update => {
      if (update.data && update.data.taskModified) {
        const updatedItem = update.data.taskModified;
        const index = this.items.findIndex(item => {
          return item.id === updatedItem.id;
        });
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
      }
    });
    this.itemService.subscribeToDelete(deletedObj => {
      if (deletedObj.data && deletedObj.data.taskDeleted) {
        const deletedIndex = deletedObj.data.taskDeleted;
        if (deletedIndex) {
          this.items = this.items.filter(item => {
            return !(item.id === deletedIndex);
          });
        }
      }
    });

    this.online = this.networkService.networkInterface.isOffline();
    this.networkService.networkInterface.onStatusChangeListener({
      onStatusChange: (networkInfo) => {
        console.log(`Network state changed. Online: ${networkInfo.online}`);
        this.online = networkInfo.online;
      }
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

