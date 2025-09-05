import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory } from './category.model';
import { FilterData } from '../../shared/types/filter.model';
import { PageResponse } from '../../shared/types/page-response.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getCategorys(filterData: FilterData): Observable<PageResponse<ICategory[]>> {
        return this.http.post<PageResponse<ICategory[]>>(this.apiUrl + '/category', filterData);
    }

}

