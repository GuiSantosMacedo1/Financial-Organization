import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactions = [
    { id: 1, category: 'Alimentação', description: 'Compra no Supermercado', amount: -150.00, date: '2023-10-01' },
    { id: 2, category: 'Trabalho', description: 'Salário', amount: 3000.00, date: '2023-10-01' },
    { id: 3, category: 'Conta', description: 'Conta de Luz', amount: -100.00, date: '2023-09-30' },
    { id: 4, category: 'Trabalho', description: 'Freelance', amount: 200.00, date: '2023-09-29' },
    { id: 5, category: 'Lazer', description: 'Cinema', amount: -50.00, date: '2023-09-28' },
    { id: 6, category: 'Transporte', description: 'Combustível', amount: -80.00, date: '2023-09-27' },
    { id: 7, category: 'Saúde', description: 'Medicamentos', amount: -30.00, date: '2023-09-26' },
    { id: 8, category: 'Trabalho', description: 'Bônus', amount: 500.00, date: '2023-09-25' },
    { id: 9, category: 'Alimentação', description: 'Restaurante', amount: -120.00, date: '2023-09-24' },
    { id: 10, category: 'Conta', description: 'Internet', amount: -60.00, date: '2023-09-23' },
    { id: 11, category: 'Lazer', description: 'Show', amount: -200.00, date: '2023-09-22' },
    { id: 12, category: 'Transporte', description: 'Uber', amount: -40.00, date: '2023-09-21' },
    { id: 13, category: 'Saúde', description: 'Consulta Médica', amount: -150.00, date: '2023-09-20' }
  ];

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

  ngOnInit(): void {
    this.transactionsByCategory();
  }

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
