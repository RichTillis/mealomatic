import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
