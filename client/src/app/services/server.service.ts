import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { ClientResponse } from 'http';
import { map } from 'rxjs/operators';


@Injectable()
export class ServerService {


    constructor(private http: HttpClient,
                private discoverservice: DiscoverService) {}


    signUpUser(name:string,email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post('https://e5fcbe2a.ngrok.io/auth/signup',JSON.stringify({name,email,password}),
        {headers: headers});
    }

    logInUser(email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post('https://e5fcbe2a.ngrok.io/auth/login',
        JSON.stringify({email,password}),
        {headers: headers});
    }

    createEvent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string) {
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date}));
            return this.http.post('https://e5fcbe2a.ngrok.io/feed/posts',JSON.stringify({ename, category, evenue, fevenue, imagePath, date}),
            {headers: headers});
    }

    getCreatedEvents() {
        this.http.get('https://e5fcbe2a.ngrok.io/feed/posts')
        
        .subscribe(
            
            (response: Response) => {
                console.log(response.json());
                const discover:Discover[]=response.json();
                this.discoverservice.setDiscover(discover);
            }
        );
    }
}

// <{access_token: string}>