import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';
import { MealCreatePage } from '../meal-create/meal-create.page';
import { AuthService } from '../../services/auth/auth.service';
import { ModalBaseComponent } from 'src/app/components/modal-base/modal-base.component';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit, OnDestroy {

  meals: Meal[];
  currentSegmentSelected = "list";
  constructor(
    public auth: AuthService, 
    private mealService: MealService, 
    public modalController: ModalController, 
    private routerOutlet: IonRouterOutlet
    ) { }

  ngOnInit() {
    this.mealService.meals.subscribe((data: any) => {
      this.meals = data;
    })
  }

  ngOnDestroy() {
  }

  filterLiked() {
    console.log('I want to animate and fill/empty this when clicked!')
  }

  createNewMeal() {
    this.presentNewMealModal();
  }

  editMeal(mealId: string) {
    console.log('meal id: ', mealId);
  }

  segmentChanged(event: any) {
    // console.log('Segment changed to: ', event.detail.value);
    this.currentSegmentSelected = event.detail.value;
  }

  isGridDisplay() {
    return "grid" === this.currentSegmentSelected;
  }

  isListDisplay() {
    return "list" === this.currentSegmentSelected;
  }

  isSquareDisplay() {
    return "square" === this.currentSegmentSelected;
  }

  async presentNewMealModal() {
    const modal = await this.modalController.create({
      component: MealCreatePage
    });
    return await modal.present();
  }

  async openAccount() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: AccountPage,
      },
    });
    await modal.present();
  }

}
