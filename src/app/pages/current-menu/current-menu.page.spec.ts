import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentMenuPage } from './current-menu.page';

describe('CurrentMenuPage', () => {
  let component: CurrentMenuPage;
  let fixture: ComponentFixture<CurrentMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
