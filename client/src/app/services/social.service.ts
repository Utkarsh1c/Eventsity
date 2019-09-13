import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { Discover } from '../discover/discover.model';

export class SocialService {
    discoverChanged = new Subject<Discover[]>();
    eventSelected = new EventEmitter<Discover>();

    private discover : Discover[] = [
        new Discover(
        'Marathon', 
        'RDC', 
        'Near Talwakars, City Complex, Ghaziabad', 
        'assets/images/marathon.jpg',
        '26 Sept\'19',
        'Tanishq Bhardwaj'),
    ];

    getSocial() { //sending copy of array to list
        return this.discover.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.discover[index];
    }

    addSocial(discovers: Discover) {
        this.discover.push(discovers);
        this.discoverChanged.next(this.discover.slice());
    }
}