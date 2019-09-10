import { EventEmitter } from '@angular/core';

import { Discover } from './discover.model';

export class DiscoverService {
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

    getEvents() {
        return this.discover.slice();
    }

    getEvent(index:number) {
        return this.discover[index];
    }
}