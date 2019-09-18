import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CreateService {
    constructor(private http:HttpClient) {}

    createEvent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string) {
            const headers = new HttpHeaders({'Content-Type':'application/json'})
            console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date}));
            return this.http.post('https://93ffe8a0.ngrok.io/feed/posts',JSON.stringify({ename, category, evenue, fevenue, imagePath, date}),
            {headers: headers});
        }
}