import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Task } from '../../services/types';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<Task>;
  loading = true;
  errors: any;

  constructor(
    private router: Router,
    public itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(result => {
      console.log('Result from query', result);
      this.items = result.data && result.data.allTasks;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  openNewItemPage() {
    this.router.navigate(['/new-item']);
  }

  goToItem(item) {
    this.router.navigate(['/update-item', item]);
  }

  deleteItem(item) {
    this.itemService.deleteItem(item).subscribe(result => {
      console.log('Result from mutation', result);
      this.loading = result.loading;
      this.errors = result.errors;
      this.items = this.items.filter((data: any) => {
        return !(data.id === item.id);
      });
    });
  }
  subscribe() {
    console.log('Subscribe');
    // TODO
  }
}

