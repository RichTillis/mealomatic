import { Component, OnInit, NgZone, SimpleChanges } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from 'src/app/interfaces/meal';
import { AngularFireStorage } from '@angular/fire/storage';
import { CompressorService } from '../../services/compressor/compressor.service';

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
  selector: 'app-meal-create',
  templateUrl: './meal-create.page.html',
  styleUrls: ['./meal-create.page.scss'],
})
export class MealCreatePage implements OnInit {
  mealForm: FormGroup;
  mealImage: any;
  testImage: string = 'assets/default-meal-meal.jpg';

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
      title: ["", Validators.required],
      accompaniments: [""]
    });
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
  processNewImage(event) {
    // console.log(event);
    let newImage = event;
    this.compress(newImage).subscribe(res => {
      let reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
        this.mealImage = res;
        // this.zone.run(() => {
        //   this.mealImage = res;
        // })
      };
    });
  }

  async createMeal() {
    const title: string = this.mealForm.get("title").value;
    const accompaniments: string = this.mealForm.get("accompaniments").value;
    const id = this.mealService.createId();

    let newMeal: Meal = {
      id: id,
      title: title,
      accompaniments: accompaniments
    };

    if (this.mealImage) {
      const filePath = `/images/${id}`;
      this.fireStorage.upload(filePath, this.mealImage).then(() => {
        const imageRef = this.fireStorage.ref(filePath);
        imageRef.getDownloadURL().subscribe(url => {
          newMeal.imageURL = url;
          // this.mealService.addMeal(newMeal).then(() => {
          //   this.closeModal();
          // })
        })
      }).catch(err => alert(err));
    }

    this.mealService.addMeal(newMeal).then(() => {
      this.closeModal();
    });

  }

}