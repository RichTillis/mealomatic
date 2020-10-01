import { Component, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, Dimensions, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { Plugins, CameraResultType, CameraPhoto } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent {
  @Output()
  imageChanged = new EventEmitter();

  @Output()
  newImageCroppingStarted = new EventEmitter();

  constructor() { }

  imageChangedEvent: any = '';
  imageBase64String: string = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    this.imageBase64String = 'data:image/png;base64,' + image.base64String;
    // this.newMealImage = 'data:image/jpeg;base64,' + image.base64String;
    // this.newMealImageData = image;
  }

  fileChangeEvent(event: any): void {
    // console.log('event: ', event);
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {

    // this.croppedImage = base64ToFile(event.base64);
    // console.log(event.base64);
    this.croppedImage = event.base64;
    // console.log(this.croppedImage);
    // this.imageChanged.emit(this.croppedImage);
  }

  imageLoaded() {
    this.newImageCroppingStarted.emit(true);
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
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

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  clearImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.imageChangedEvent = null;
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  confirmImageCrop() {
    //strip data:image/jpeg;base64,
    // string.replace('data:image/jpeg;base64,', '');
    this.imageChanged.emit(this.croppedImage);
    this.newImageCroppingStarted.emit(false);
    // this.imageChanged.emit(base64ToFile(this.croppedImage));
    this.imageBase64String = '';
  }

  close(){
    this.imageBase64String = '';
  }
}