import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiservice } from '@/service/apiservice';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  constructor(private apiService: Apiservice) {}

  getAllUsers(): Observable<any> {
    return this.apiService.post<any>('admin/users', {});
  }
}
