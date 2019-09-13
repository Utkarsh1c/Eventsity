import { EventEmitter } from '@angular/core';

import { Discover } from '../discover/discover.model';
import { Subject } from 'rxjs';

export class SportsService {
    discoverChanged = new Subject<Discover[]>();
    eventSelected = new EventEmitter<Discover>();

    private discover : Discover[] = [
        new Discover(
        'Saksham', 
        'AKG', 
        'Adhyatmik Nagar, Ghaziabad', 
        'assets/images/marathon.jpg',
        '29 Sept\'19',
        'Om Prakash'),
    ];

    getSports() { //sending copy of array to list
        return this.discover.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.discover[index];
    }

    addSports(discovers: Discover) {
        this.discover.push(discovers);
        this.discoverChanged.next(this.discover.slice());
    }
}