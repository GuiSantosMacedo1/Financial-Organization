import { Component, OnInit } from '@angular/core';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { ModalTransactionsComponent } from "../shared/modal-transactions/modal-transactions.component";
import { NgFor } from '@angular/common';
import { TransactionsService } from '../core/services/transactions.service';
import { CardsComponent } from "../shared/cards/cards.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SideBar, ModalTransactionsComponent, NgFor, CardsComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  activeModal = false

  transactions: any[] = [];
  categories: string[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((response: any) => {
      this.transactions = response.data || [];
      this.categories = [...new Set(this.transactions.map(transaction => transaction.category).filter(Boolean))];
    });
  }
}
