import { EventEmitter } from '@angular/core';

import { Discover } from './discover.model';
import { Subject } from 'rxjs';

export class DiscoverService {
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
        new Discover(
            'EDM Night',
            'AKG',
            'Adhyatmik Nagar, AKG College, Ghaziabad',
            'assets/images/edm.jpg',
            '29 September\'19',
            'Utkarsh Mittal'),
        new Discover(
            'Technocrat',
            'ABES',
            'Crossing Republik, ABES College, Ghaziabad',
            'assets/images/tech.jpg',
            '5 October\'19',
            'Ritik Gupta'),
    ];

    getEvents() { //sending copy of array to list
        return this.discover.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.discover[index];
    }

    adddiscover(discovers: Discover) {
        this.discover.push(discovers);
        this.discoverChanged.next(this.discover.slice());
    }
}