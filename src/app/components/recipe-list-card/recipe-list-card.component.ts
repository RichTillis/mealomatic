import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-list-card',
  templateUrl: './recipe-list-card.component.html',
  styleUrls: ['./recipe-list-card.component.scss'],
})
export class RecipeListCardComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {}

}
