import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsComponent  } from './recent-transactions.component';
import { TransactionsService } from '../../core/services/transactions.service';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransactionsComponent],
      providers: [{
        provide: TransactionsService,
        useValue: {
          getTransactions: () => {},
          notifyTransactionsChanged: () => {}
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
