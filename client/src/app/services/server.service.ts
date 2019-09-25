import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class ServerService {

    private rootUrl = "https://ca10d6ab.ngrok.io";

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
        date: string, orgname: string, description: string) {
            const token = localStorage.getItem('token')
            const headers = new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization': `Bearer `+token,
            })
            console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}));
            return this.http.post(this.rootUrl+'/feed/posts',JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}),
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

    verifyUser(otp:string, id:any) {
        // console.log(id);
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        return this.http.post(this.rootUrl+'/auth/verify/'+id,
        JSON.stringify({otp}),
        {headers: headers});
    }

    resendOtp(id:any) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        return this.http.post(this.rootUrl+'/auth/resend/'+id,
        {headers: headers});
    }

    getMyEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/feed/myevents', { headers: headers });
    }

    sendenquiry(enquiry: string, id:any) {
            const token = localStorage.getItem('token')
            const headers = new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization': `Bearer `+token,
            })
            console.log(JSON.stringify({enquiry}));
            return this.http.post(this.rootUrl+'/feed/enquiry/'+id,JSON.stringify({enquiry}),
            {headers: headers});
    }

    register(name: string, email: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        console.log(JSON.stringify({name, email}));
        return this.http.post(this.rootUrl+'/feed/register/'+id,JSON.stringify({name, email}),
        {headers: headers});
    }
}

// <{access_token: string}>