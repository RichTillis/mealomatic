import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MealService } from '../../services/meal/meal.service';
import { Meal } from 'src/app/interfaces/meal';
import { AngularFireStorage } from '@angular/fire/storage';
import { CompressorService } from '../../services/compressor/compressor.service';
import { ImageCroppedEvent, Dimensions, ImageTransform, base64ToFile } from 'ngx-image-cropper';

// references
// https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
// https://medium.com/@amcdnl/file-uploads-with-angular-reactive-forms-960fd0b34cb5
// https://medium.com/javascript-in-plain-english/upload-files-and-images-to-firebase-and-retrieve-a-downloadable-url-a5b3467bb89c
// https://www.npmjs.com/package/ngx-image-compress
// https://zocada.com/compress-resize-images-javascript-browser/
// https://www.thepolyglotdeveloper.com/2019/06/image-cropping-zooming-scaling-angular-javascript/
// https://www.youtube.com/watch?v=UnqVkzWg2W0
// https://github.com/Mawi137/ngx-image-cropper
// https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.page.html',
  styleUrls: ['./meal-create.page.scss'],
})
export class MealCreatePage implements OnInit {
  mealForm: FormGroup;
  mealImage: any;

  validation_messages = {
    title: [
      { type: "required", message: "A title is required." },
    ],
  };

  constructor(private zone: NgZone,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public modalController: ModalController,
    private mealService: MealService,
    private fireStorage: AngularFireStorage,
    private compressor: CompressorService) {
  }

  ngOnInit() {
    this.mealForm = this.formBuilder.group({
      title: ["", Validators.required],
      mealImage: [null]
    });
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  compress(image: File) {
    return this.compressor.compress(image)
  }

  private processNewImage(imageFile) {
    this.compress(imageFile).subscribe(res => {
      let reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
        this.zone.run(() => {
          this.mealImage = res;
        })
      };
    });
  }

  createMeal() {
    let title: string = this.mealForm.get("title").value;
    let id = this.mealService.createId();

    let newMeal: Meal = {
      id: id,
      title: title
    };

    if (this.mealImage) {
      const filePath = `/images/${id}`;
      this.fireStorage.upload(filePath, this.mealImage).then(() => {
        const imageRef = this.fireStorage.ref(filePath);
        imageRef.getDownloadURL().subscribe(url => {
          newMeal.image = url;
          this.mealService.addMeal(newMeal).then(() => {
            this.closeModal();
          })
        })
      }).catch(err => alert(err));
    }
    else {
      this.mealService.addMeal(newMeal).then(() => {
        this.closeModal();
      })
    }
  }

  //************************ image cropping functions
  // TODO - this s/b a seperate component
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
   
    // this.croppedImage = event.base64;
    // console.log(event);
    this.croppedImage = base64ToFile(event.base64);
    // console.log(event, base64ToFile(event.base64));
    this.processNewImage(this.croppedImage);
  }

  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log('Cropper ready', sourceImageDimensions);
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
  //************************ image cropping functions - done

}