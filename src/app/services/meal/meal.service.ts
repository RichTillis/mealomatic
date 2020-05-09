import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Meal } from '../../interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealsCollection: AngularFirestoreCollection<Meal>;
  meals: Observable<Meal[]>;


  constructor(private readonly afs: AngularFirestore) {
    this.mealsCollection = afs.collection<Meal>('meals');
    this.meals = this.mealsCollection.valueChanges();
  }

  // updateMeal(meal:Meal){
  //   this.mealDoc.update(meal);
  // }

  addMeal(meal:Meal){
    meal.id = this.afs.createId();
    this.mealsCollection.doc(meal.id).set(meal);
  }
}
