import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.page.html',
  styleUrls: ['./meal-create.page.scss'],
})
export class MealCreatePage implements OnInit {
  mealForm: FormGroup;

  // move these
  private basePath = '/images';
  private data: File;
  imgURL: any;

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
      description: [""],
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
  mealImage: any;

  public processNewImage(event) {
    this.data = event.target.files;

    console.log(this.data[0]);
    this.compress(this.data[0]).subscribe(res => {
      console.log(res)


      let reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {


        this.zone.run(() => {
          this.mealImage = res;
          this.imgURL = reader.result;
        })
      };
    });
  }

  createMeal() {
    let title: string = this.mealForm.get("title").value;
    let description: string = this.mealForm.get("description").value;
    let imageObject = this.mealImage;
    let id = this.mealService.createId();

    let newMeal: Meal = {
      id: id,
      title: title
    };

    if (description) {
      newMeal.description = description;
    }

    if (imageObject) {
      //need to grab the image file extension and append it to the id and use it as the filename
      const filePath = `${this.basePath}/${imageObject.name}`;
      this.fireStorage.upload(filePath, imageObject).then(() => {
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
}