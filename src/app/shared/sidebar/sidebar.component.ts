import { Component, inject, OnInit } from '@angular/core';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent,
} from 'ng-zorro-antd/layout';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import menuElements, { defaultActiveMenuItem } from './menu.elements';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {EnvironmentType} from "../../../environments/environment.interface";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    NgClass,
    NgIf,
    NzMenuDirective,
    NzTooltipDirective,
    NzContentComponent,
    NzHeaderComponent,
    NzIconDirective,
    NgOptimizedImage,
    NzMenuItemComponent,
    RouterLink,
    NgForOf,
    NzSubMenuComponent,
    NzBadgeComponent,
    NzTagComponent,
    NzIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  user = {
    isLogged: true,
    name: 'John Doe',
    role: 'Admin',
  };
  activeMenuItem = defaultActiveMenuItem;
  router = inject(Router);
  protected readonly menuElements = menuElements;
  protected readonly environment = environment;
  protected readonly EnvironmentType = EnvironmentType;

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveMenuItem();
      });

    this.updateActiveMenuItem();
  }

  updateActiveMenuItem() {
    const currentUrl = this.router.url;

    menuElements.forEach(menuElement => {
      if (menuElement.route === currentUrl) {
        this.activeMenuItem = menuElement;
      } else if (menuElement.submenu) {
        menuElement.submenu.forEach(submenuElement => {
          if (submenuElement.route === currentUrl) {
            this.activeMenuItem = submenuElement;
          }
        });
      }
    });
  }
}
