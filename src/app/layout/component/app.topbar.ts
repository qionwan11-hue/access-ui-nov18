import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        DrawerModule,
        TranslatePipe
    ],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss'
})
export class AppTopbar implements OnInit {
    displayConfirmation = false;
    userName: any = '';
    userEmail: any = '';
    userUid: any = '';
    showProfileDrawer = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getUserName();
    }

    getUserName() {
        try {
            const raw = localStorage.getItem('user');
            if (!raw) return;

            const parsed = JSON.parse(raw);
            const user = parsed?.data?.user ?? parsed;

            this.userName = user?.name ?? user?.username ?? '';
            this.userEmail = user?.email ?? '';
            this.userUid = user?.id ?? '';
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            this.userName = '';
            this.userEmail = '';
            this.userUid = '';
        }
    }

    openProfile(): void {
        this.showProfileDrawer = true;
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    openConfirmation() {
        this.displayConfirmation = true;
    }

    logOutConfirmation() {
        this.displayConfirmation = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('gotLocation');
        this.router.navigate(['/auth/login']);
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }
}
