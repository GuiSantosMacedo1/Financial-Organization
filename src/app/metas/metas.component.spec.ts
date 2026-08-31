import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasComponent } from './metas.component';
import { MetasService } from '../core/services/metas.service';
import { of } from 'rxjs';

describe('MetasComponent', () => {
  let component: MetasComponent;
  let fixture: ComponentFixture<MetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetasComponent],
      providers: [
        {
          provide: MetasService,
          useValue: { getMetas: () => of({ data: [] }) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
