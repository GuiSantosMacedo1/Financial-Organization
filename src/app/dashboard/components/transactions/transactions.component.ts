import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactions: any[] = [];
  
  constructor(private transactionsService: TransactionsService) {}
  ngOnInit(): void {
    this.transactions = this.transactionsService.getTransactions();
    this.transactionsByCategory();
  }


  getIconsByCategory(category: string): string {
    switch (category) {
      case 'Alimentação': return 'fa-utensils';
      case 'Trabalho': return 'fa-briefcase';
      case 'Lazer': return 'fa-film';
      case 'Transporte': return 'fa-car';
      case 'Saúde': return 'fa-heart';
      case 'Conta': return 'fa-file-invoice';
      default: return 'fa-question';
    }
  }
  getCategoryColor(category: string): string {
    switch (category) {
      case 'Alimentação': return 'bg-success';
      case 'Trabalho': return 'bg-primary';
      case 'Lazer': return 'bg-danger';
      case 'Transporte': return 'bg-warning';
      case 'Saúde': return 'bg-info';
      case 'Conta': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  categories: any[] = [];

  calculateTotalIncome(): number {
    return this.transactions
      .filter(gasto => gasto.amount < 0).reduce((sum, gasto) => sum + gasto.amount, 0);
  }

  transactionsByCategory() {
      const grouped = this.transactions.filter(value => value.amount < 0).reduce((categories: any, transaction) => {
      const category = transaction.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(transaction);
      return categories;
    }, {});

    this.categories = Object.keys(grouped).map(category => ({
      category: category,
      transactions: grouped[category],
      total: grouped[category].reduce((sum: number, t: any) => sum + t.amount, 0)
    }));
    console.log(this.categories);
  }
  porcentageOfCategory(total: number): string {
    const balance = this.calculateTotalIncome();
    if (balance === 0) return '0%';
    const percentage = (Math.abs(total) / Math.abs(balance)) * 100;
    return `${percentage.toFixed(2)}%`;
  }
}
