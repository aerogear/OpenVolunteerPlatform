import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/sync/task.service';

@Component({
  selector: 'app-offline-queue',
  templateUrl: './offline-queue.page.html',
  styleUrls: ['./offline-queue.page.scss']
})
export class OfflineQueuePage implements OnInit {
  interval: number;
  constructor(private taskService: TaskService) { }
  stagedTasks: any;
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

  private async fetchData() {
    const tempTasks = await this.taskService.getOfflineTasks();
    if (tempTasks.length > 0) {
      this.stagedTasks = tempTasks.map(task => task.operation.op);
    } else {
      this.stagedTasks = [];
    }
  }
}
