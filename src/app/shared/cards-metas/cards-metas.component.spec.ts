import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CardsMetasComponent } from './cards-metas.component';
import { MetasService } from '../../core/services/metas.service';

describe('CardsMetasComponent', () => {
  let component: CardsMetasComponent;
  let fixture: ComponentFixture<CardsMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsMetasComponent],
      providers: [
        {
          provide: MetasService,
          useValue: { getMetas: () => of({ data: [] }) }
        }
      ]
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
