import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { ModalController } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';
import { MealCreatePage } from '../meal-create/meal-create.page';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit, OnDestroy {

  meals: Meal[];
  constructor(public auth: AuthService, private mealService: MealService, public modalController: ModalController) { }

  ngOnInit() {
    this.mealService.meals.subscribe((data: any) => {
      this.meals = data;
    })
  }

  ngOnDestroy() {
  }

  createNewMeal() {
    this.presentNewMealModal();
  }

  editMeal(mealId: string) {
    console.log('meal id: ', mealId);
  }

  async presentNewMealModal() {
    const modal = await this.modalController.create({
      component: MealCreatePage
    });
    return await modal.present();
  }

}
