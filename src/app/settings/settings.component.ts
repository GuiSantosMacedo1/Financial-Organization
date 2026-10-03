import { Component } from '@angular/core';
import { SideBar } from '../core/layout/sidebar/side-bar.component';
import { AccountSettingsComponent } from '../shared/account-settings/account-settings.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SideBar, AccountSettingsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
