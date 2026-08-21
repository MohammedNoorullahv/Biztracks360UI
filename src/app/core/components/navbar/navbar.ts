import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {

  openMenus: string[] = [];

  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMenu(menuName: string): void {
    const index = this.openMenus.indexOf(menuName);

    if (index > -1) {
      this.openMenus.splice(index, 1);
    } else {
      this.openMenus.push(menuName);
    }
  }

  isMenuOpen(menuName: string): boolean {
    return this.openMenus.includes(menuName);
  }
}