import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-offline-queue",
  templateUrl: "./offline-queue.page.html",
  styleUrls: ["./offline-queue.page.scss"]
})
export class OfflineQueuePage implements OnInit {
  constructor() {}
  stagedItems: any;

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.stagedItems = JSON.parse(
      window.localStorage.getItem("offline-mutation-store")
    );
    if (this.stagedItems.length > 0) {
      this.stagedItems = this.stagedItems.map(taskItem => {
        return taskItem.operation;
      });
    }
  }
}
