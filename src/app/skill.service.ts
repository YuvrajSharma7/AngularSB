import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from './skill';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private baseUrl = "http://localhost:8081/api/v1/skill";
    constructor(private httpClient: HttpClient) { }
    getSkillList(): Observable<Skill[]> {
        return this.httpClient.get<Skill[]>(`${this.baseUrl}`);
    }

}
