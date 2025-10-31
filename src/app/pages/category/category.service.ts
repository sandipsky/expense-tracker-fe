import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory } from './category.model';
import { FilterData } from '../../shared/types/filter.model';
import { PageResponse } from '../../shared/types/page-response.model';
import { ApiResponse } from '../../shared/types/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiUrl = environment.apiUrl + '/category';
    constructor(private http: HttpClient) { }

    getCategorys(filterData: FilterData): Observable<PageResponse<ICategory[]>> {
        return this.http.post<PageResponse<ICategory[]>>(this.apiUrl, filterData);
    }

    createCategory(formData: ICategory): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiUrl + '/add', formData);
    }

    editCategory(formData: ICategory, id: number): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(this.apiUrl + `/edit/${id}`, formData);
    }

    deleteCategory(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.apiUrl + `/delete/${id}`);
    }
}

