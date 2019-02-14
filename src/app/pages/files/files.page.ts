import { Component, OnInit } from '@angular/core';
import { FileEntry } from '../../services/file/types';
import { FileService } from '../../services/file/file.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  private items: Array<FileEntry>;
  private files: FileList;

  constructor(public fileService: FileService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.fileService.getItems().then((items) => {
      this.items = items.data.uploads;
    }).catch((err) => {
      this.alertCtrl.create({
        message: `Cannot fetch files. Please make sure you are online.`,
        header: `Fetching files`,
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
      console.log('Error when fetching files', err);
    });
  }

  uploadFile({ target }) {
    console.log(target.files[0]);
    this.fileService.createFile(target.files[0]).then(() => {
      this.refreshData();
      this.files = undefined;
    }).catch((err) => {
      this.alertCtrl.create({
        message: `Cannot save file. Please make sure you are online.`,
        header: `Saving file`,
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
      console.log('Problem with uploading file ', err);
    });
  }

}
