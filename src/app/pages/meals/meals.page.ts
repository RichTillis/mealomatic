import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';
import { MealCreatePage } from '../meal-create/meal-create.page';
import { MealEditPage } from '../meal-edit/meal-edit.page';
import { AuthService } from '../../services/auth/auth.service';
import { ModalBaseComponent } from 'src/app/components/modal-base/modal-base.component';

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

  async editMeal(meal: Meal) {
    console.log('meal id: ', meal.id);
    const modal = await this.modalController.create({
      component: MealEditPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        meal: meal
      },
    });
    await modal.present();
    modal.onDidDismiss().then((res: any) => {
      // if (res.data && res.data.remove) {
      //   this.boardService.closeBoard(this.board.id).then(() => {
      //     this.navCtrl.pop();
      //   });
      // }
    });
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

  // async presentNewMealModal() {
  //   const modal = await this.modalController.create({
  //     component: MealCreatePage
  //   });
  //   return await modal.present();
  // }

  async createNewMeal() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: MealCreatePage,
      },
    });

    modal.onDidDismiss().then((res: any) => {
      //TODO: Handle returned data!
    });

    await modal.present();
  }

}
