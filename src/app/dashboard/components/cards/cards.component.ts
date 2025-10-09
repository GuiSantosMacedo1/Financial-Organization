import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  transactions: any[] = [];

  constructor(private transactionsService: TransactionsService) { }
  ngOnInit(): void {
    this.transactions = this.transactionsService.getTransactions();
  }

  calculateTotalIncome(): number {
    return this.transactions
      .filter(gasto => gasto.amount > 0).reduce((sum, gasto) => sum + gasto.amount, 0);
  }
  calculateTotalExpense(): number {
    return this.transactions
    .filter(gasto => gasto.amount < 0).reduce((sum, gasto) => sum + gasto.amount, 0);
  }
  calculateBalance(): number {
    return this.calculateTotalIncome() + this.calculateTotalExpense();
  }
}
