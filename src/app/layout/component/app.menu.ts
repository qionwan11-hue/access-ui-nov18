import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../service/layout.service';
import { AvatarModule } from 'primeng/avatar';
import { TranslatePipe } from '@ngx-translate/core';
import { Authservice } from '../../pages/auth/service/authservice';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, ButtonModule, AvatarModule, TranslatePipe],
    templateUrl: './app.menu.html',
})
export class AppMenu {
    model: MenuItem[] = [];

    userName = '';
    userEmail = '';
    userInitial = 'U';
    constructor(private layoutService: LayoutService, private authService: Authservice) { }

    ngOnInit() {
        this.initMenu();
        this.loadUser();
    }
    initMenu() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] }]
            }
        ];

        if (this.authService.isAdmin()) {
            this.model.push({
                label: 'Admin',
                items: [
                    { label: 'User List', icon: 'pi pi-fw pi-users', routerLink: ['/app/admin/users'] }
                ]
            });
        }
    }
    closeMenu() {
        this.layoutService.layoutState.update((prev) => ({
            ...prev,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false
        }));
    }
    loadUser() {
        try {
            const parsed = JSON.parse(localStorage.getItem('user') || '{}');
            const user = parsed?.data?.user ?? parsed;
            this.userName = user?.username || user?.name || 'User';
            this.userEmail = user?.email || '';
            this.userInitial = this.userName.charAt(0).toUpperCase();
        } catch {
            this.userName = 'User';
            this.userEmail = '';
            this.userInitial = 'U';
        }
    }
}
