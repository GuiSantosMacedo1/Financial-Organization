import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../shared/cards/cards.component';
import { RecentTransactionsComponent } from "../shared/recent-transactions/recent-transactions.component";
import { ModalTransactionsComponent } from '../shared/modal-transactions/modal-transactions.component';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { SpendingComponent } from "../shared/spending/spending.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsComponent, RecentTransactionsComponent, ModalTransactionsComponent, SideBar, SpendingComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeModal: boolean = false;
}