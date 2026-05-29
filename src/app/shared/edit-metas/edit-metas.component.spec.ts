import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetasComponent } from './edit-metas.component';

describe('EditMetasComponent', () => {
  let component: EditMetasComponent;
  let fixture: ComponentFixture<EditMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMetasComponent]
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
