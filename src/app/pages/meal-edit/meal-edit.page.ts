import { Component, OnInit, NgZone, SimpleChanges } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from 'src/app/interfaces/meal';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { CompressorService } from '../../services/compressor/compressor.service';
import { ImageService } from '../../services/image/image.service';
import { Plugins, CameraResultType, CameraPhoto } from '@capacitor/core';

import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const { Camera } = Plugins;

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
// https://ultimatecourses.com/blog/component-events-event-emitter-output-angular-2

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.page.html',
  styleUrls: ['./meal-edit.page.scss'],
})
export class MealEditPage implements OnInit {
  meal: Meal;
  mealForm: FormGroup;
  mealImage: string;
  newMealImage: string = '';
  newMealImageBase64: string = '';
  newMealImageData: CameraPhoto;
  dummyMealImage: string = 'assets/default-meal-meal.jpg';
  showMealImage: boolean = true;

  validation_messages = {
    title: [
      { type: "required", message: "A title is required." },
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    private mealService: MealService,
    private fireStorage: AngularFireStorage,
    private loadingController: LoadingController,
    private compressorService: CompressorService) {
  }

  ngOnInit() {
    this.mealForm = this.formBuilder.group({
      title: [this.meal.title, Validators.required],
      accompaniments: [this.meal.accompaniments]
    });
    this.mealImage = this.meal.imageURL
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //should go into an image service
  compress(image: File) {
    let width = 600;
    let type = 'jpeg';
    return this.compressorService.compress(image, width, type)
  }

  //should go into an image service
  processNewImage(event: string) {
    this.mealImage = event;
    this.newMealImageBase64 = event;
    // console.log(event);
    // let newImage = event;
    // this.compress(newImage).subscribe(res => {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(res);
    //   reader.onload = () => {
    //     this.mealImage = res;
    //     // this.zone.run(() => {
    //     //   this.mealImage = res;
    //     // })
    //   };
    // });
  }

  toggleMealImage(newImageCroppingStartedEvent: boolean) {
    this.showMealImage = !newImageCroppingStartedEvent;
  }

  //i think this goes away

  // async changeMealImage() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64,
  //   });

  //   this.mealImage = 'data:image/jpeg;base64,' + image.base64String;
  //   this.newMealImageData = image;
  // }

  async updateMeal() {
    const title: string = this.mealForm.get("title").value;
    const accompaniments: string = this.mealForm.get("accompaniments").value;

    let meal: Meal = {
      id: this.meal.id,
      title: title,
      accompaniments: accompaniments
    };

    if (this.newMealImageBase64) {
      const filePath = `${this.mealService.basePath}/${meal.id}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task: AngularFireUploadTask = fileRef.putString(
        this.newMealImageBase64.replace("data:image/png;base64,", ""),
        'base64',
        { contentType: 'image/png' }
      )
      //https://stackoverflow.com/questions/50541836/property-downloadurl-does-not-exist-on-type-angularfireuploadtask/50663965
      const loading = await this.loadingController.create();
      await loading.present();
      await task;
      console.log('Image uploaded');
      meal.imageURL = await fileRef.getDownloadURL().toPromise();
      this.loadingController.dismiss();
    }

    this.mealService.updateMeal(meal).then(() => {
      this.closeModal();
    });
  }

}