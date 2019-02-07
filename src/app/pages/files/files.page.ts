import { Component, OnInit } from '@angular/core';
import { FileEntry } from '../../services/file/types';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  private items: Array<FileEntry>;

  constructor(public fileService: FileService) { }

  ngOnInit() {
    const self = this;
    this.fileService.getItems().then((items) => {
      self.items = items.data.uploads;
    });
  }

}
