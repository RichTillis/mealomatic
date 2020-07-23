import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortMenuPage } from './sort-menu.page';

describe('SortMenuPage', () => {
  let component: SortMenuPage;
  let fixture: ComponentFixture<SortMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
