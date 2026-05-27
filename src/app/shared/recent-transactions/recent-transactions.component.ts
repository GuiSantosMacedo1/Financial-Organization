import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditTransactionsComponent } from '../edit-transactions/edit-transactions.component';
import { DeleteTransactionsComponent } from "../delete-transactions/delete-transactions.component";

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule, EditTransactionsComponent, DeleteTransactionsComponent],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent {
  @Input() activeTodos: boolean = false;
  @Input() transactions: any[] = [];
  selectedTransaction: any = null
  activeModalEdit: any = false;
  activeModalDelete: any = false;
  
  constructor( private router: Router ) {}
    ngOnChanges(): void {
      this.transactions = this.transactions
        .slice()
        .sort((a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
        );
      this.transactionsByCategory();
    }

  openModalEdit(transaction: any){
    this.selectedTransaction = transaction
    this.activeModalEdit = true
  }
  openModalDelete(transaction: any){
    this.selectedTransaction = transaction
    this.activeModalDelete = true
  }

  routeTransactions(): void{
    this.router.navigate(['/transactions']);
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
  }
  porcentageOfCategory(total: number): string {
    const balance = this.calculateTotalIncome();
    if (balance === 0) return '0%';
    const percentage = (Math.abs(total) / Math.abs(balance)) * 100;
    return `${percentage.toFixed(2)}%`;
  }
}
