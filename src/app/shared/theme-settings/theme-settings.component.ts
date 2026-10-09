import { Component, inject } from '@angular/core';
import { ThemePreference, ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [],
  templateUrl: './theme-settings.component.html',
  styleUrl: './theme-settings.component.scss'
})
export class ThemeSettingsComponent {
  theme = inject(ThemeService);

  options: { value: ThemePreference; label: string}[] = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Escuro' },
    { value: 'system', label: 'Sistema' }
  ]
}
