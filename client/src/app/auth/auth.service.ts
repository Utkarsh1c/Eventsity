import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {

    constructor(private http:HttpClient) {}

    signUpUser(name:string,email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post('https://da88c7d7.ngrok.io/auth/signup',JSON.stringify({name,email,password}),
        {headers: headers});
    }
    logInUser(email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post('https://da88c7d7.ngrok.io/auth/login',JSON.stringify({email,password}),
        {headers: headers});
    }
}