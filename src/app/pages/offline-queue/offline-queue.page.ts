import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-queue',
  templateUrl: './offline-queue.page.html',
  styleUrls: ['./offline-queue.page.scss']
})
export class OfflineQueuePage implements OnInit {
  interval: number;
  constructor() { }
  stagedItems: any;
  Object = Object;

  async ngOnInit() {
    this.getData();
  }

  ionViewDidLeave() {
    window.clearInterval(this.interval);
  }

  public getData() {
    this.fetchData();
    this.interval = window.setInterval(this.fetchData.bind(this), 2000);
  }

  private fetchData() {
    const tempItems = JSON.parse(window.localStorage.getItem('offline-mutation-store'));
    if (tempItems.length > 0) {
      this.stagedItems = tempItems.map(taskItem => taskItem.operation );
    } else {
      this.stagedItems = [];
    }
  }
}
