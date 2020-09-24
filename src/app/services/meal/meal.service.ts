import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Meal } from '../../interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealsCollection: AngularFirestoreCollection<Meal>;
  meals: Observable<Meal[]>;
  public basePath = '/meal-images';
  downloadableURL = '';
  private task: AngularFireUploadTask;


  constructor(private readonly afs: AngularFirestore, private fireStorage: AngularFireStorage) {
    this.mealsCollection = afs.collection<Meal>('meals');
    this.meals = this.mealsCollection.valueChanges();
  }

  // updateMeal(meal:Meal){
  //   this.itemDoc = afs.doc<Item>('items/1');
  //   this.mealsCollection.ref.update(meal);
  // }

  addMeal(meal: Meal) {
    // meal.id = this.afs.createId();
    return this.mealsCollection.doc(meal.id).set(meal);
  }

  createId() {
    return this.afs.createId();
  }

  async addMealImage(image) {
    if (image) {
      const filePath = `${this.basePath}/${image.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, image);    // upload task

      // this.progress = this.snapTask.percentageChanges();

      (await this.task).ref.getDownloadURL().then(url => { this.downloadableURL = url; });  // <<< url is found here

    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }
  }

  async uploadMealImage(image: any) {

    const filePath = `${this.basePath}/${image.name}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task: AngularFireUploadTask = fileRef.putString(
      image.base64String,
      'base64',
      { contentType: 'image/png' }
    );

    (await task).ref.getDownloadURL().then(url => { this.downloadableURL = url; });
  }

}
