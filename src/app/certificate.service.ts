import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from './certificate';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {
    private baseUrl = "http://localhost:8081/api/v1/certificate";
    constructor(private httpClient: HttpClient) { }
    getCertificateList(): Observable<Certificate[]> {
        return this.httpClient.get<Certificate[]>(`${this.baseUrl}`);
    }

}
