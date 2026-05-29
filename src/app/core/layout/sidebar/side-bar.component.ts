import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from 'rxjs';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBar implements OnInit{

  activeTab: string = 'dashboard';
  isMenuOpen = false;
  
  menuItems = [
    { name: 'Dashboard', tab: 'dashboard', route: '/dashboard' },
    { name: 'Transactions', tab: 'transactions', route: '/transactions' },
    { name: 'Metas', tab: 'metas', route: '/metas' },
    { name: 'Settings', tab: 'settings', route: '/settings' }
  ]

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateActiveMenuFromRoute(event.url);
      this.isMenuOpen = false;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuClick(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }
  
  private updateActiveMenuFromRoute(url: string): void {
    const menuItem = this.menuItems.find(item => 
      url.includes(item.route.substring(1)));
      if (menuItem) {
        this.activeTab = menuItem.tab;
      }
    }
}