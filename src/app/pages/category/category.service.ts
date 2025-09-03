import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getCategorys(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(this.apiUrl + '/category');
    }

}

