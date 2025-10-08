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
  ];
}
