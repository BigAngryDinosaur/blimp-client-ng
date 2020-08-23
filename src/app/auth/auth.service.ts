import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

interface IUserResponse {
    name: string
}

export interface IUserCredentials {
    username: string,
    password: string
}

@Injectable()
export class AuthService {

    baseUrl = 'http://localhost:8082';
    isAuthenticated = false;

    constructor(private httpClient: HttpClient, private router: Router) { }

    authenticate(credentials?: IUserCredentials, callback?: () => void) { 

        const headers = new HttpHeaders(credentials ? {
            Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`
        } : {});

        this.httpClient
            .get<IUserResponse>(`${this.baseUrl}/user`, { headers: headers })
            .subscribe(response => {
                this.isAuthenticated = response['name'] != null
                return callback && callback();
            })
    }

    logout() {
        this.httpClient
            .post(`${this.baseUrl}/logout`, {})
            .pipe(
                finalize(() => {
                    this.isAuthenticated = false;
                    this.router.navigateByUrl('/');
                })
            )
            .subscribe();
    }
}