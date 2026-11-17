import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Apiservice } from '@/service/apiservice';

@Injectable({
    providedIn: 'root'
})
export class LocationAccessService {
    private location: any = null;

    constructor(private apiService: Apiservice) {}

    setLocation(coords: GeolocationCoordinates): any {
        this.location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            capturedAt: new Date().toISOString()
        };
        return this.location;
    }

    getLocation(): any {
        return this.location;
    }

    clear(): void {
        this.location = null;
    }

    private getUserEmail(): string | null {
        try {
            const raw = localStorage.getItem('user');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return parsed?.data?.user?.email ?? parsed?.email ?? null;
        } catch {
            return null;
        }
    }

    saveLocationToBackend(): Observable<any> {
        if (!this.location) {
            return throwError(() => new Error('No location captured'));
        }

        const email = this.getUserEmail();
        if (!email) {
            return throwError(() => new Error('User email not found'));
        }

        return this.apiService.post('location/save', {
            email,
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            capturedAt: this.location.capturedAt
        });
    }
}
