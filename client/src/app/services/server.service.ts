import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class ServerService {

    private rootUrl = "https://7d995213.ngrok.io";

    constructor(private http: HttpClient,
                private authservice:AuthService,
                // private discoverservice: DiscoverService
                ) {}


    signUpUser(name:string,email:string,password:string,cpassword:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post(this.rootUrl+'/auth/signup',JSON.stringify({name,email,password,cpassword}),
        {headers: headers});
    }

    logInUser(email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post(this.rootUrl+'/auth/login',
        JSON.stringify({email,password}),
        {headers: headers});
    }

    createEvent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string) {
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date}));
            return this.http.post(this.rootUrl+'/feed/posts/1',JSON.stringify({ename, category, evenue, fevenue, imagePath, date}),
            {headers: headers});
    }

    getCreatedEvents() {
         return this.http.get(this.rootUrl+'/feed/posts');
    }

    getLoggedInUser(): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/auth/login', { headers: headers });
    }

    verifyUser(otp:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post(this.rootUrl+'/verify',
        JSON.stringify({otp}),
        {headers: headers});
    }
}

// <{access_token: string}>