import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITransaction } from './transaction.model';
import { FilterData } from '../../shared/types/filter.model';
import { PageResponse } from '../../shared/types/page-response.model';
import { ApiResponse } from '../../shared/types/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    apiUrl = environment.apiUrl + '/transaction';
    constructor(private http: HttpClient) { }

    getTransactions(filterData: FilterData): Observable<PageResponse<ITransaction[]>> {
        return this.http.post<PageResponse<ITransaction[]>>(this.apiUrl, filterData);
    }

    createTransaction(formData: ITransaction): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiUrl + '/add', formData);
    }

    updateTransaction(formData: ITransaction, id: number): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(this.apiUrl + `/edit/${id}`, formData);
    }

    deleteTransaction(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.apiUrl + `/delete/${id}`);
    }
}

