import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/sync/task.service';
import { Task } from '../../services/sync/types';
import { ToastController } from '@ionic/angular';
import { OfflineNotifier } from '../../components/offline.notifier';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage extends OfflineNotifier implements OnInit {

  task: Task;
  edit_task_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private taskService: TaskService,
    toastController: ToastController
  ) {
    super(toastController);
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.task = param as Task;
        this.buildForm();
      }
    );
  }

  private buildForm() {
    this.edit_task_form = this.formBuilder.group({
      title: new FormControl(this.task.title, [Validators.required, Validators.maxLength(255)]),
      description: new FormControl(this.task.description, [Validators.required, Validators.maxLength(255)])
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  updateTask(value) {
    const newValues = {
      id: this.task.id,
      version: Number(this.task.version), // For some reason it's a string
      title: value.title,
      description: value.description,
      status: this.task.status
    };
    this.taskService.updateTask(newValues).then(result => {
      console.log('Result from server for mutation', result);
      this.goBack();
    }).catch((error) => {
      this.handleOfflineMutation(error);
      if (error.networkError && error.networkError.localConflict) {
        // Developers can merge data, but in this case we are simply
        // providing fresh one.
        this.presentToast('The task you are trying to edit was changed on server. Please review your changes');
        this.task = error.networkError.base;
      } else {
        this.goBack();
      }
    });
  }
}
