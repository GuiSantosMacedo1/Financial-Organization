import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMetasComponent } from './modal-metas.component';

describe('ModalMetasComponent', () => {
  let component: ModalMetasComponent;
  let fixture: ComponentFixture<ModalMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMetasComponent]
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
