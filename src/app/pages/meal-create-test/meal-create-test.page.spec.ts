import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealCreateTestPage } from './meal-create-test.page';

describe('MealCreateTestPage', () => {
  let component: MealCreateTestPage;
  let fixture: ComponentFixture<MealCreateTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCreateTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealCreateTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
