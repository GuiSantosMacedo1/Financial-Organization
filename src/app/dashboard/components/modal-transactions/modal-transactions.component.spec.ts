import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransactionsComponent } from './modal-transactions.component';

describe('ModalTransactionsComponent', () => {
  let component: ModalTransactionsComponent;
  let fixture: ComponentFixture<ModalTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
