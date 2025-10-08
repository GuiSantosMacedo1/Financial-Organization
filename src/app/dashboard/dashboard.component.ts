import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CardsComponent } from './components/cards/cards.component';
import { TransactionsComponent } from "./components/transactions/transactions.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CardsComponent, TransactionsComponent],
templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateActiveMenuFromRoute(event.url);
    });
  }

  navigateTo(route: string, itemId: string): void {
    this.setActiveTab(itemId)
    this.router.navigate([route]);
  }

  private updateActiveMenuFromRoute(url: string): void {
    const menuItem = this.menuItems.find(item => 
      url.includes(item.route.substring(1)));
    if (menuItem) {
      this.activeTab = menuItem.tab;
    }
  }

  activeTab: string = 'dashboard';

  menuItems = [
    { name: 'Dashboard', tab: 'dashboard', route: '/dashboard' },
    { name: 'Transactions', tab: 'transactions', route: '/transactions' },
    { name: 'Budgets', tab: 'budgets', route: '/budgets' },
    { name: 'Metas', tab: 'metas', route: '/metas' },
    { name: 'Settings', tab: 'settings', route: '/settings' }
  ]

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }
}