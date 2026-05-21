import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-transactions',
  standalone: true,
  imports: [],
  templateUrl: './delete-transactions.component.html',
  styleUrl: './delete-transactions.component.scss'
})
export class DeleteTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>()

  constructor(){}

  closeModal() {
    this.closed.emit()
  }
}
