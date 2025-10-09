import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-transactions',
  standalone: true,
  imports: [],
  templateUrl: './modal-transactions.component.html',
  styleUrl: './modal-transactions.component.scss'
})
export class ModalTransactionsComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
