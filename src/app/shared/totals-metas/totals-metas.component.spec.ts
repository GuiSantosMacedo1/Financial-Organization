import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MetasService } from '../../core/services/metas.service';
import { TotalsMetasComponent } from './totals-metas.component';

describe('TotalsMetasComponent', () => {
  let component: TotalsMetasComponent;
  let fixture: ComponentFixture<TotalsMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsMetasComponent],
      providers: [
        {
          provide: MetasService,
          useValue: { getMetas: () => of({ data: [] }) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
