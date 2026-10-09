import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';
const PREFERENCES: ThemePreference[] = ['light', 'dark', 'system'];

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  readonly preference = signal<ThemePreference>(this.readStored());
  private systemPrefersDark = signal(this.mediaQuery.matches);

  readonly resolved = computed<'light' | 'dark'>(() => {
    const pref = this.preference();
    if (pref == 'system') return this.systemPrefersDark() ? 'dark' : 'light';
    return pref
  });

  constructor() {
    
    this.mediaQuery.addEventListener('change', (event) => this.systemPrefersDark.set(event.matches));

    effect(() => {
      const root = this.document.documentElement;
      root.setAttribute('data-theme', this.resolved());
    })
  }

  setPreference( pref: ThemePreference): void {
    this.preference.set(pref);

    try {
      localStorage.setItem(STORAGE_KEY, pref);
    } catch (error) {
      console.error('Error saving theme preference to localStorage', error);
    }
  }

  private readStored(): ThemePreference {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      return stored && PREFERENCES.includes(stored) ? stored : 'system';
    } catch (error) {
      console.error('Error reading theme preference from localStorage', error);
      return 'system';
    }
  }
}
