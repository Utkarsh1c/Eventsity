import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {

    constructor(private serverservice: ServerService) {}

    // loggedIn() {
    //     return !!localStorage.getItem('token');
    // }
}