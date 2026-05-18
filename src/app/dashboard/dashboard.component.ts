import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { ModalTransactionsComponent } from './components/modal-transactions/modal-transactions.component';
import { SideBar } from "../core/sidebar/side-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsComponent, TransactionsComponent, ModalTransactionsComponent, SideBar],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeModal: boolean = false;
}