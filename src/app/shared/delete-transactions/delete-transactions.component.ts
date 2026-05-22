import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-transactions.component.html',
  styleUrl: './delete-transactions.component.scss'
})
export class DeleteTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: any = null
  @Output() closed = new EventEmitter<void>()
  @Output() deleted = new EventEmitter<void>()
  
  errorMessage: any = null;
  constructor(private transactionService: TransactionsService){}
  
  closeModal() {
    this.closed.emit()
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
