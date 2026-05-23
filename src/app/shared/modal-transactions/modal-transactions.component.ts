import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../core/services/transactions.service';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-modal-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyMaskModule],
  templateUrl: './modal-transactions.component.html',
  styleUrls: ['./modal-transactions.component.scss']
})
export class ModalTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() transactionsCreate = new EventEmitter<any>();

  transaction = {
    description: '',
    amount: 0,
    date: '',
    type: 'income',
    category: ''
  };
  isLoading = false;
  errorMessage = '';

  constructor(private transactionsService: TransactionsService) {}

  createTransaction(event: any) {
    event.preventDefault();

    if(!this.validateForm()){
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    const transactionData = {
      ...this.transaction,
      amount: this.transaction.type === 'expense' ? -Math.abs(this.transaction.amount) : Math.abs(this.transaction.amount),
    }

    this.transactionsService.postTransactions(transactionData).subscribe(response => {
      this.transactionsService.notifyTransactionsChanged();
      this.transactionsCreate.emit(response);
      this.isLoading = false;
      this.closeModal();
      this.resetForm();
    }, error => {
      this.errorMessage = 'Erro ao criar transação. Tente novamente.';
      this.isLoading = false;
      this.resetForm();
      console.error('Erro ao criar transação:', error);
    });
  }

  validateForm(): boolean {
    if (!this.transaction.description || this.transaction.amount <= 0 || !this.transaction.type) {
      return false;
    }
    return true;
  }

  resetForm() {
    this.transaction = {
      description: '',
      amount: 0,
      type: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    };
    this.errorMessage = '';
  }
  closeModal() {
    this.close.emit();
    this.resetForm();
  }
}
