import { Component, OnInit } from '@angular/core';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { ModalTransactionsComponent } from "../shared/modal-transactions/modal-transactions.component";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../core/services/transactions.service';
import { CardsComponent } from "../shared/cards/cards.component";
import { RecentTransactionsComponent } from '../shared/recent-transactions/recent-transactions.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SideBar, ModalTransactionsComponent, NgFor, FormsModule, CardsComponent, RecentTransactionsComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  activeModal = false
  activeModalEdit = false
  searchTerm = '';
  searchCategory = '';
  searchType = '';

  transactions: any[] = [];
  categories: string[] = [];
  transactionsChangedSubscription: any = null

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransaction();
    this.transactionsChangedSubscription = this.transactionsService.transactionsChanged$.subscribe(() => {
      this.loadTransaction();
    });
  }
  loadTransaction(){
    this.transactionsService.getTransactions().subscribe((response: any) => {
      this.transactions = response.data || [];
      this.categories = [...new Set(this.transactions.map(transaction => transaction.category).filter(Boolean))];
    });
  }

  get filteredTransactions(): any[] {
    return this.transactions.filter(transaction => {
      const searchTerm = this.searchTerm.trim().toLowerCase();
      const searchCategory = this.searchCategory.trim().toLowerCase();
      const searchType = this.searchType.trim().toLowerCase();

      const matchesText =
        !searchTerm ||
        transaction.description?.toLowerCase().includes(searchTerm) ||
        transaction.category?.toLowerCase().includes(searchTerm) ||
        transaction.type?.toLowerCase().includes(searchTerm);

      const matchesType = !searchType || transaction.type?.toLowerCase() === searchType;
      const matchesCategory = !searchCategory || transaction.category?.toLowerCase() === searchCategory;

      return matchesText && matchesType && matchesCategory;
    });
  }
}
