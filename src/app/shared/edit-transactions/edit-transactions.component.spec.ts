import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionsComponent } from './edit-transactions.component';
import { TransactionsService } from '../../core/services/transactions.service';

describe('EditTransactionsComponent', () => {
  let component: EditTransactionsComponent;
  let fixture: ComponentFixture<EditTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTransactionsComponent],
      providers: [{
        provide: TransactionsService,
        useValue: {
          getTransactions: () => {},
          notifyTransactionsChanged: () => {}
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
