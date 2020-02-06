import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { TaskService } from '../../services/sync/task.service';
import { ToastController } from '@ionic/angular';
import { OfflineNotifier } from '../../components/offline.notifier';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage extends OfflineNotifier implements OnInit {

  new_task_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private taskService: TaskService,
    toastController: ToastController
  ) {
    super(toastController);
  }

  ngOnInit() {
    this.new_task_form = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  createTask(value) {
    this.taskService.createTask(value.title, value.description).then(result => {
      console.log('Got result from server for mutation', result);
      this.new_task_form.reset();
      this.goBack();
    }).catch((error) => {
      this.handleOfflineMutation(error);
      this.new_task_form.reset();
      this.goBack();
    });
  }

}
