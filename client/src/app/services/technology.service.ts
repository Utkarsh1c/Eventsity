import { EventEmitter } from '@angular/core';

import { Discover } from '../discover/discover.model';
import { Subject } from 'rxjs';

export class TechnologyService {
    discoverChanged = new Subject<Discover[]>();
    eventSelected = new EventEmitter<Discover>();

    private discover : Discover[] = [
        new Discover(
            'Technocrat',
            'ABES',
            'Crossing Republik, ABES College, Ghaziabad',
            'assets/images/tech.jpg',
            '5 October\'19',
            'Ritik Gupta'),
    ];

    getTechnology() { //sending copy of array to list
        return this.discover.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.discover[index];
    }

    addTechnology(discovers: Discover) {
        this.discover.push(discovers);
        this.discoverChanged.next(this.discover.slice());
    }
}