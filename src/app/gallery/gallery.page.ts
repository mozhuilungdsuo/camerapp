import { Gallery } from 'angular-gallery';
import { ActionSheetController } from '@ionic/angular';
import { Photo, PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

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
  showGallery() {
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
