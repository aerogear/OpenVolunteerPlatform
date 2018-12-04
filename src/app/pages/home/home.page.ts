import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<any>;
  loading = true;
  errors: any;

  constructor(
    private router: Router,
    public itemService: ItemService
  ) { }

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
    console.log('Delete item');
    // TODO
  }

  subscribe() {
    console.log('Subscribe');
    // TODO
  }

  loadMore(item) {
    console.log('Load more items');
    // TODO
  }

}
