import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../core/services/transactions.service';

@Component({
  selector: 'app-edit-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-transactions.component.html',
  styleUrl: './edit-transactions.component.scss'
})
export class EditTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: any = null
  @Output() saved = new EventEmitter<void>()
  @Output() closed = new EventEmitter<void>()

  localTransaction: any = {
    _id: '',
    description: '',
    amount: 0,
    date: '',
    type: 'income',
    category: ''
  }

  constructor(private transactionsService: TransactionsService){}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['transaction'] && this.transaction) {
      this.localTransaction = { ...this.transaction }
    }
    if(changes['isOpen'] && !this.isOpen) {
      this.localTransaction = {
        _id: '',
        description: '',
        amount: 0,
        date: '',
        type: 'income',
        category: ''
      }
    }
  }
  
  closeModal() {
    this.closed.emit()
  }
  
  editTransactions(){
    if(!this.transaction?._id) return;
    
    const payload = {
      category: this.transaction.category,
      description: this.transaction.description,
      amount: this.transaction.amount,
      date: this.transaction.date,
      type: this.transaction.type
    };
    
    this.transactionsService.putTransactions(this.transaction._id, payload).subscribe({
      next: () => {
        this.saved.emit();
        this.closeModal();
      }
    })
    console.log("🚀 ~ EditTransactionsComponent ~ editTransactions ~ editTransactions:", this.editTransactions)
  }
}
