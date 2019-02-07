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
  private loading = true;
  private files: FileList;

  constructor(public fileService: FileService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.fileService.getItems().then((items) => {
      this.loading = false;
      this.items = items.data.uploads;
    }).catch((err) => {
      console.log('Error when fetching files', err);
    });
  }

  uploadFile({ target }) {
    console.log(target.files[0]);
    this.fileService.createFile(target.files[0]).then(() => {
      this.refreshData();
    }).catch((err) => {
      console.log('Problem with uploading file ', err);
    });
  }

}
