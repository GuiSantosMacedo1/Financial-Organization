import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../shared/cards/cards.component';
import { RecentTransactionsComponent } from "../shared/recent-transactions/recent-transactions.component";
import { ModalTransactionsComponent } from '../shared/modal-transactions/modal-transactions.component';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { SpendingComponent } from "../shared/spending/spending.component";
import { TransactionsService } from '../core/services/transactions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsComponent, RecentTransactionsComponent, ModalTransactionsComponent, SideBar, SpendingComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeModal: boolean = false;
  transactions: [] = [];
  private readonly destroyRef = inject(DestroyRef);

  constructor(private transactionsService: TransactionsService){}
  ngOnInit() {
      this.loadTransactions();
      this.transactionsService.transactionsChanged$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.loadTransactions();
        });
    }

  loadTransactions() {
    this.transactionsService.getTransactions().subscribe((response: any) => {
        const items =
          response?.data ?? [];
        this.transactions = items;
      });
  }
}