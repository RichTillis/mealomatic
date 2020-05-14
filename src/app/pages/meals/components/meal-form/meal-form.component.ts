import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    title: [
      { type: "required", message: "A title is required." },
    ],
  };

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  this.loginForm = this.formBuilder.group({
    title: [""],
    password: ["",Validators.required]
  });
  }

}
