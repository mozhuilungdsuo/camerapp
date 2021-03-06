import { element } from 'protractor';
import { Photo, PhotoService } from './../services/photo.service';

import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Gallery } from 'angular-gallery';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private gallery: Gallery
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
  showgallery() {
    const imagesarray = [];
    this.photoService.loadSaved().then(() => {
      this.photoService.photos.forEach((element: any) => {
        imagesarray.push({ path: element.webviewPath });
      });

      let prop = {
        images: imagesarray,
      };
      this.gallery.load(prop);
    });
  }
}
