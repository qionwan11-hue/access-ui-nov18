import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocationAccessService } from '../service/location-access';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        ProgressSpinnerModule
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
    showLocationDialog = false;
    isLoading = false;

    constructor(private locationAccess: LocationAccessService) {}

    ngOnInit() {
        this.showLocationDialog = localStorage.getItem('gotLocation') !== 'true';
    }

    acceptLocationAccess(): void {
        this.showLocationDialog = false;

        if (!navigator.geolocation) {
            localStorage.setItem('gotLocation', 'false');
            return;
        }

        this.isLoading = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.locationAccess.setLocation(position.coords);
                this.locationAccess.saveLocationToBackend().subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        const saved = res?.data;
                        const ok =
                            saved?.gotLocation === true ||
                            Boolean(saved?.location?.place || saved?.location?.city || saved?.location?.country);

                        localStorage.setItem('gotLocation', ok ? 'true' : 'false');
                        this.showLocationDialog = false;
                    },
                    error: () => {
                        this.isLoading = false;
                        localStorage.setItem('gotLocation', 'false');
                    }
                });
            },
            () => {
                this.isLoading = false;
                localStorage.setItem('gotLocation', 'false');
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    }

    declineLocationAccess(): void {
        this.showLocationDialog = false;
        localStorage.setItem('gotLocation', 'false');
    }
}
