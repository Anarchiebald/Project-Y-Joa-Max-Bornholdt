import {Component, signal} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model/userAccount.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarCollapsed = signal<boolean>(false);
  user$: Observable<UserAccount | null>;

  isDropdownOpen = false;


  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  items = [
    {
      routeLink: '#',
      icon: 'fal fa-home',
      label: 'Home',
    },
    {
      routeLink: '#',
      icon: 'fal fa-search',
      label: 'Explore',
    },
    {
      routeLink: '#',
      icon: 'fal fa-bell',
      label: 'Notifications',
    },
    {
      routeLink: '#',
      icon: 'fal fa-envelope',
      label: 'Messages',
    },
    {
      routeLink: '#',
      icon: 'fal fa-user',
      label: 'Profile',
    },

  ];

  toggleSidebar() {
    this.isSidebarCollapsed.update(value => !value);
  }

  ngOnInit(): void {
    this.authService.loadUserFromStorage();
    if (this.user$ == null) {
      this.router.navigate(['/login']).then();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
