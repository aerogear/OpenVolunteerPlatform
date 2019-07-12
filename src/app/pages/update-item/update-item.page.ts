import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../../services/sync/item.service';
import { Task } from '../../services/sync/types';
import { ToastController } from '@ionic/angular';
import { OfflineNotifier } from '../../components/offline.notifier';

@Component({
  selector: 'update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage extends OfflineNotifier implements OnInit {

  item: Task;
  edit_item_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private itemService: ItemService,
    toastController: ToastController
  ) {
    super(toastController);
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.item = param as Task;
        this.buildForm();
      }
    );
  }

  private buildForm() {
    this.edit_item_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required)
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  updateItem(value) {
    const newValues = {
      id: this.item.id,
      version: Number(this.item.version), // For some reason it's a string
      title: value.title,
      description: value.description,
      status: this.item.status
    };
    this.itemService.updateItem(newValues).then(result => {
      console.log('Result from server for mutation', result);
      this.goBack();
    }).catch((error) => {
      this.handleOfflineMutation(error);
      if (error.networkError && error.networkError.localConflict) {
        // Developers can merge data, but in this case we are simply
        // providing fresh one.
        this.presentToast('Item you are trying to edit was changed on server. Please review your changes');
        this.item = error.networkError.base;
      } else {
        this.goBack();
      }
    });
  }
}
