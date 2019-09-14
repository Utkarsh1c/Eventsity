import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { Social } from '../model/social.model';

export class SocialService {
    discoverChanged = new Subject<Social[]>();
    eventSelected = new EventEmitter<Social>();

    private social : Social[] = [
        new Social(
        'Marathon', 
        'RDC', 
        'Near Talwakars, City Complex, Ghaziabad', 
        'assets/images/marathon.jpg',
        '26 Sept\'19',
        'Tanishq Bhardwaj'),
    ];

    getSocial() { //sending copy of array to list
        return this.social.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.social[index];
    }

    addSocial(discovers: Social) {
        this.social.push(discovers);
        this.discoverChanged.next(this.social.slice());
    }
}