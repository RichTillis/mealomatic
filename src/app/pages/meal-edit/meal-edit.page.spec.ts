import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealEditPage } from './meal-edit.page';

describe('MealEditPage', () => {
  let component: MealEditPage;
  let fixture: ComponentFixture<MealEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
