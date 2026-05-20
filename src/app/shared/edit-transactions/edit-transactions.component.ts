import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../core/services/transactions.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-edit-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyMaskModule],
  templateUrl: './edit-transactions.component.html',
  styleUrl: './edit-transactions.component.scss'
})
export class EditTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: any = null
  @Output() saved = new EventEmitter<void>()
  @Output() closed = new EventEmitter<void>()

  errorMessage:any = null
  localTransaction: any = {
    _id: '',
    description: '',
    amount: '',
    date: '',
    type: 'income',
    category: ''
  }

  constructor(private transactionsService: TransactionsService){}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['transaction'] && this.transaction) {
      this.localTransaction = { ...this.transaction }
    }
  }
  
  closeModal() {
    this.closed.emit()
  }

    validateForm(): boolean {
    if (!this.localTransaction.description || this.localTransaction.amount <= 0 || !this.localTransaction.type) {
      return false;
    }
    return true;
  }

  editTransactions(){
    if(!this.localTransaction?._id){
      this.errorMessage = 'Erro ao encontrar o ID'
      return
    }
    if(!this.validateForm()){
      this.errorMessage = 'Precisa preencher todos os campos'
      return
    }
    const payload = {
      category: this.localTransaction.category,
      description: this.localTransaction.description,
      amount: this.localTransaction.amount,
      date: this.localTransaction.date,
      type: this.localTransaction.type
    };
    
    this.transactionsService.putTransactions(this.localTransaction._id, payload).subscribe({
      next: () => {
        this.saved.emit();
        this.closeModal();
      } 
    })
  }
}
