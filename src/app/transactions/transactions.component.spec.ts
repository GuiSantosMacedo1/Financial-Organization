import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TransactionsComponent } from './transactions.component';
import { TransactionsService } from '../core/services/transactions.service';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsComponent],
      providers: [{
        provide: TransactionsService,
        useValue: {
          getTransactions: () => of({ data: [] }),
          transactionsChanged$: of(undefined),
          notifyTransactionsChanged: () => {}
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
