import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

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
  getTransactions() {
    return this.transactions;
  }
  constructor() { }
}
