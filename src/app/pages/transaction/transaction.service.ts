import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITransaction } from './transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getTransactions(): Observable<ITransaction[]> {
        return this.http.get<ITransaction[]>(this.apiUrl + '/transaction');
    }

}

