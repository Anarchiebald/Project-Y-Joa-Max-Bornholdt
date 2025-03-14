import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, NgIf, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Project Y";
  showSidebar: boolean = false;
  showContent: boolean = false;
  isSidebarCollapsed = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event=>
    {if (event instanceof NavigationEnd) {
      this.showSidebar = !['/login', '/register'].includes(event.url);
      this.showContent = !['/login', '/register'].includes(event.url);
    }
    });
  }

  toggleSidebar(event: boolean) {
    this.isSidebarCollapsed = event;
  }
}
