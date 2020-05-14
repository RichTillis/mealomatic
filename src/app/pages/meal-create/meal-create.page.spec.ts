import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealCreatePage } from './meal-create.page';

describe('MealCreatePage', () => {
  let component: MealCreatePage;
  let fixture: ComponentFixture<MealCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
