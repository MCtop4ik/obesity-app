import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as csvParser from 'csv-parser';
import { map, Observable, retry, throwError, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl = 'http://localhost:3000/';
    private retryCount = 3;

    constructor(private http: HttpClient) {}

    getBaseUrl(): string {
        return this.baseUrl;
    }

    login(data: any): Observable<any> {
        console.log(`${this.baseUrl}/login`);
        return this.http.post(`${this.baseUrl}/login`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; 
            }),
            catchError(() => {
                return '401';
            }),
        );
    }

    register(data: any): Observable<any> {
        console.log(`${this.baseUrl}/register`);
        data['userRole'] = 'patient'
        console.log(data);
        return this.http.post(`${this.baseUrl}/register`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; 
            }),
            catchError(() => {
                alert('Holy Molly')
                return '401';
            }),
        );
    }

    ping(): Observable<HttpResponse<any>> {
        return this.http.get<HttpResponse<any>>(`${this.baseUrl}/ping`, this.getHeader()).pipe(
            retry(this.retryCount)
        );
    }

    userDiets(userid: any): Observable<HttpResponse<any>> {
        return this.http.get<HttpResponse<any>>(`${this.baseUrl}/user-diets?userid=${userid}`, this.getHeader()).pipe(
            retry(this.retryCount)
        );
    }

    mivoloRecognise(): Observable<HttpResponse<any>> {
        return this.http.get<HttpResponse<any>>(`${this.baseUrl}/mivolo`, this.getHeader()).pipe(
            retry(this.retryCount)
        );
    }


    generateReceipt(meal_title: string): Observable<any> {
        console.log(`${this.baseUrl}/giga-chat/chat-completion`);
        return this.http.post(`${this.baseUrl}/giga-chat/chat-completion`, {meal_title}, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; 
            }),
            catchError(() => {
                return '401';
            }),
        );
    }


    techProblem(data: any): Observable<any> {
        console.log(`${this.baseUrl}/tech-problem`);
        return this.http.post(`${this.baseUrl}/tech-problem`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; 
            }),
            catchError(() => {
                return '401';
            }),
        );
    }

    applyDiet(data: any): Observable<any> {
        console.log(`${this.baseUrl}/apply-diet`);
        return this.http.post(`${this.baseUrl}/apply-diet`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; 
            }),
            catchError(() => {
                return '401';
            }),
        );
    }

    changeUserInfo(data: any): Observable<any> {
        console.log(`${this.baseUrl}/change-user`);
        return this.http.put(`${this.baseUrl}/change-user`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; // Возвращаем тело ответа
            }),
            catchError((error: any) => {
                console.error('Error updating user info:', error);
                return of({ status: 'error', message: 'Failed to update user info' }); // Возвращаем Observable с ошибкой
            }),
        );
    }

    approveDiet(data: any): Observable<any> {
        console.log(`${this.baseUrl}/approve-diet`);
        return this.http.put(`${this.baseUrl}/approve-diet`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; // Возвращаем тело ответа
            }),
            catchError((error: any) => {
                console.error('Error updating user info:', error);
                return of({ status: 'error', message: 'Failed to update user info' }); // Возвращаем Observable с ошибкой
            }),
        );
    }

    disapproveDiet(data: any): Observable<any> {
        console.log(`${this.baseUrl}/disapprove-diet`);
        return this.http.put(`${this.baseUrl}/disapprove-diet`, data, {
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body; // Возвращаем тело ответа
            }),
            catchError((error: any) => {
                console.error('Error updating user info:', error);
                return of({ status: 'error', message: 'Failed to update user info' }); // Возвращаем Observable с ошибкой
            }),
        );
    }

    getHeader() {
        const http_options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return http_options;
    }
}