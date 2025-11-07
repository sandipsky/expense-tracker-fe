import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DropdownItem } from '../types/dropdown';

@Injectable({
    providedIn: 'root'
})
export class DropdownService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getCategoryDropdown(): Observable<DropdownItem[]> {
        return this.http.get<DropdownItem[]>(this.apiUrl + '/category');
    }

    getAccountsDropdown(): Observable<DropdownItem[]> {
        return this.http.get<DropdownItem[]>(this.apiUrl + '/account');
    }

}

