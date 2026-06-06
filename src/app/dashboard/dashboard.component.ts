import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CardsComponent } from '../shared/cards/cards.component';
import { RecentTransactionsComponent } from "../shared/recent-transactions/recent-transactions.component";
import { ModalTransactionsComponent } from '../shared/modal-transactions/modal-transactions.component';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { SpendingComponent } from "../shared/spending/spending.component";
import { TransactionsService } from '../core/services/transactions.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardsComponent,
    RecentTransactionsComponent,
    ModalTransactionsComponent,
    SideBar,
    SpendingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeModal = false;
  transactions: [] = [];
  isLoading = true;

  private destroyRef = inject(DestroyRef);

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.loadTransactions(true);
    this.transactionsService.transactionsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadTransactions(false);
      });
  }
  loadTransactions(showSkeleton = true) {
    if (showSkeleton) {
      this.isLoading = true;
    }
    this.transactionsService.getTransactions().pipe(finalize(() => {
      this.isLoading = false;
    })
    ).subscribe({
      next: (response: any) => {
        this.transactions = response?.data ?? [];
      },
      error: () => {
        this.transactions = [];
      }
    });
  }
}