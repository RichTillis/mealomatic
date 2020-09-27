import { Component, OnInit, Input } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() meal: Meal;
  
  dummyMealImage: string = 'assets/default-meal-meal.jpg';

  constructor() { }

  ngOnInit() {
  }

}
