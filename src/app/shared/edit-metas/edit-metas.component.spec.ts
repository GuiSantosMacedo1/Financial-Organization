import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EditMetasComponent } from './edit-metas.component';
import { MetasService } from '../../core/services/metas.service';

describe('EditMetasComponent', () => {
  let component: EditMetasComponent;
  let fixture: ComponentFixture<EditMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMetasComponent],
      providers: [
        {
          provide: MetasService,
          useValue: { getMetas: () => of({ data: [] }) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
