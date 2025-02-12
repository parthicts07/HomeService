import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
    this.setTheme(savedTheme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.LIGHT_THEME ? this.DARK_THEME : this.LIGHT_THEME;
    this.setTheme(newTheme);
  }

  private setTheme(theme: string): void {
    document.body.classList.remove(this.LIGHT_THEME, this.DARK_THEME);
    document.body.classList.add(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getCurrentTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
  }

  isDarkTheme(): boolean {
    // alert("Dark")
    return this.getCurrentTheme() === this.DARK_THEME;
  }
}