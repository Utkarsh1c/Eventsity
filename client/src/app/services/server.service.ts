import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class ServerService {

    private rootUrl = "https://46644356.ngrok.io";

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

    getRegisteredEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/user/registered/upcoming', { headers: headers });
    }

    getEarlierRegisteredEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/user/registered/visited', { headers: headers }); 
    }

    sendenquiry(enquiry: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        console.log(JSON.stringify({enquiry}));
        return this.http.post(this.rootUrl+'/user/enquiry/'+id,JSON.stringify({enquiry}),
        {headers: headers});
    }

    register(name: string, email: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        console.log(JSON.stringify({name, email}));
        return this.http.post(this.rootUrl+'/user/register/'+id,JSON.stringify({name, email}),
        {headers: headers});
    }

    deleteEvent(id:any): Observable<any> {
        console.log(id);
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.delete(this.rootUrl+'/feed/delete/'+id, { headers: headers });
    }

    getEventsforEdit(eventid:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/feed/getupdate/'+eventid,
        {headers: headers});
    }

    updateevent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string, orgname: string, description: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}));
        return this.http.put(this.rootUrl+'/feed/update/'+id,JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}),
        {headers: headers});
    }


}