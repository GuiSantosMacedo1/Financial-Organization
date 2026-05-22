import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-delete-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyMaskModule],
  templateUrl: './delete-transactions.component.html',
  styleUrl: './delete-transactions.component.scss'
})
export class DeleteTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: any = null
  @Output() closed = new EventEmitter<void>()
  @Output() deleted = new EventEmitter<void>()
  
  errorMessage: any = null;
  localTransaction: any = {
    _id: '',
    description: '',
    amount: '',
    date: '',
    type: 'income',
    category: ''
  }
  constructor(private transactionService: TransactionsService){}
  
  ngOnChanges(changes: SimpleChanges) {
      if(changes['transaction'] && this.transaction) {
        this.localTransaction = { 
          ...this.transaction,
          date: this.transaction.date?.split('T')[0] 
        }
      }
    }
  closeModal() {
    this.closed.emit();
    this.localTransaction = {
    _id: '',
    description: '',
    amount: '',
    date: '',
    type: 'income',
    category: ''
  }
  }
  
  deleteModal(){
    if(!this.transaction?._id){
      this.errorMessage = 'Erro ao encontrar o ID'
      return
    }
    this.transactionService.deleteTransactions(this.transaction?._id).subscribe({
      next: () => {
        this.deleted.emit();
        this.closed.emit();
      }
    })
  }
}
