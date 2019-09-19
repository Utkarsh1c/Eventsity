import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { map } from 'rxjs/operators';


@Injectable()
export class ServerService {

    private rootUrl = "https://aebdf28f.ngrok.io";

    constructor(private http: HttpClient,
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
            return this.http.post(this.rootUrl+'/feed/posts',JSON.stringify({ename, category, evenue, fevenue, imagePath, date}),
            {headers: headers});
    }

    getCreatedEvents() {
        return this.http.get(this.rootUrl+'/feed/posts');
        // .map(
        //     (response: Response) => {
        //         console.log(response.json());
        //         const discover:Discover[]=response.json();
        //     }
        // )
        // .subscribe(
        //     (discover: Discover[]) => {
                
        //         this.discoverservice.setDiscover(discover);
        //     }
        // );
    }

    // loggedIn() {
    //     return !!localStorage.getItem('token');
    // }

    // getToken() {
    //     return localStorage.getItem('token');
    // }
}

// <{access_token: string}>