import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-meal-create-test',
  templateUrl: './meal-create-test.page.html',
  styleUrls: ['./meal-create-test.page.scss'],
})
export class MealCreateTestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // myImage = null;
  canvasRotation = 0;
  transform: any = {};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;

  // @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // captureImage() {
  //   this.convertFileToDataURLviaFileReader(`assets/IMG_20171019_164609.jpg`).subscribe(
  //     base64 => {
  //       this.myImage = base64;
  //     }
  //   )
  // }

  // convertFileToDataURLviaFileReader(url: string) {
  //   return Observable.create(observer => {
  //     let xhr: XMLHttpRequest = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       let reader: FileReader = new FileReader();
  //       reader.onloadend = function () {
  //         observer.next(reader.result);
  //         observer.complete();
  //       };
  //       reader.readAsDataURL(xhr.response);
  //     };
  //     xhr.open('GET', url);
  //     xhr.responseType = 'blob';
  //     xhr.send();
  //   });
  // }

  // save() {
  //   this.angularCropper.crop();
  // }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
  // }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  rotateRight() {
    this.canvasRotation++;
   this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  clearImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.imageChangedEvent = null;
  }

}
