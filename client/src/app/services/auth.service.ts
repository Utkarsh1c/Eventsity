import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private route:Router) {}

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.route.navigate(['/']);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}