import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValorMetasComponent } from './add-valor-metas.component';

describe('AddValorMetasComponent', () => {
  let component: AddValorMetasComponent;
  let fixture: ComponentFixture<AddValorMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddValorMetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddValorMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
