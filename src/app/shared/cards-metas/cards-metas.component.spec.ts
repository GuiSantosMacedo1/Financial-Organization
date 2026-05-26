import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsMetasComponent } from './cards-metas.component';

describe('CardsMetasComponent', () => {
  let component: CardsMetasComponent;
  let fixture: ComponentFixture<CardsMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsMetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
