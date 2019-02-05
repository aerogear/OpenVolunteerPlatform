import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../../services/sync/item.service';
import { Task } from '../../services/sync/types';

@Component({
  selector: 'update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  item: Task;
  edit_item_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.item = param as Task;
        this.edit_item_form = this.formBuilder.group({
          title: new FormControl(this.item.title, Validators.required),
          description: new FormControl(this.item.description, Validators.required),
        });
      }
    );
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  updateItem(value) {
    const newValues = {
      id: this.item.id,
      version: Number(this.item.version), // For some reason it's a string
      title: value.title,
      description: value.description
    };
    this.itemService.updateItem(newValues).then(result => {
      console.log('Result from server for mutation', result);
    }).catch((error) => {
      console.error(error);
    });
    this.goBack();
  }
}
