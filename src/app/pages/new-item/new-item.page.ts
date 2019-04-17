import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ItemService } from '../../services/sync/item.service';
import { ToastController } from '@ionic/angular';
import { OfflineNotifier } from '../../components/offline.notifier';

@Component({
  selector: 'new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage extends OfflineNotifier implements OnInit {

  new_item_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private itemService: ItemService,
    toastController: ToastController
  ) {
    super(toastController);
  }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  createItem(value) {
    this.itemService.createItem(value.title, value.description).then(result => {
      console.log('Got result from server for mutation', result);
      this.new_item_form.reset();
      this.goBack();
    }).catch((error) => {
      this.handleOfflineMutation(error);
      this.new_item_form.reset();
      this.goBack();
    });
  }

}
