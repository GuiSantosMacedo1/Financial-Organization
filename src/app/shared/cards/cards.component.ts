import { Component, Input } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { CommonModule } from '@angular/common';

export type CardType = 'income' | 'expense' | 'balance' | 'count';

export interface CardConfig {
  type: CardType;
  title?: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() configs: CardConfig[] = []
  @Input() small = false

  transactions: any[] = [];
  totals = { income: 0, expense: 0, balance: 0, count: 0 };

  constructor(private transactionsService: TransactionsService) {
}
  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((response: any) => {
      this.transactions = response.data || [];
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    const amounts = this.transactions.map(t => Number(t.amount ?? t.value ?? 0))
    const income = amounts.filter(income => income > 0).reduce((sum , value) => sum + value, 0)
    const expense = amounts.filter(expense => expense < 0).reduce((sum , value) => sum + Math.abs(value), 0)
    this.totals.income = income;
    this.totals.expense = expense;
    this.totals.balance = income - expense;
    this.totals.count = this.transactions.length;
  }

  getValue(type: CardType) {
    return this.totals[type] ?? 0;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  titleByType(type: CardType) {
    const map = { income: 'Receitas', expense: 'Despesas', balance: 'Saldo', count: 'Transações' };
    return map[type];
  }

  iconByType(type: CardType) {
    const map = {
    income: 'fa-solid fa-arrow-up',
    expense: 'fa-solid fa-arrow-down',
    balance: 'fa-solid fa-balance-scale',
    count: 'fa-solid fa-list-check'
  };
    return map[type];
  }

  backGroundColor(type: CardType) {
    const map = {
    income: 'rgb(175, 249, 175)',   // verde claro
    expense: 'rgb(251, 201, 201)',  // vermelho claro
    balance: 'rgb(180, 236, 255)',  // azul claro
    count: '#e2e3e5'     // cinza claro
  };
    return map[type];
}
    colorText(type: CardType) {
    const map = {
    income: 'green',   // verde claro
    expense: 'red',  // vermelho claro
    balance: 'blue',  // azul claro
    count: '#e2e3e5'     // cinza claro
  };
    return map[type];
  }
}
