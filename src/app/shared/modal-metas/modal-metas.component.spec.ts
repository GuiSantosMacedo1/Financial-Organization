import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ModalMetasComponent } from './modal-metas.component';
import { MetasService } from '../../core/services/metas.service';

describe('ModalMetasComponent', () => {
  let component: ModalMetasComponent;
  let fixture: ComponentFixture<ModalMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMetasComponent],
      providers: [
        {
          provide: MetasService,
          useValue: { getMetas: () => of({ data: [] }) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
