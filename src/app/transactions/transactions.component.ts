import { Component } from '@angular/core';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { ModalTransactionsComponent } from "../shared/modal-transactions/modal-transactions.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SideBar, ModalTransactionsComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  activeModal = false
}
