import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { Technology } from '../model/technology.model';

export class TechnologyService {
    discoverChanged = new Subject<Technology[]>();
    eventSelected = new EventEmitter<Technology>();

    private technology : Technology[] = [
        new Technology(
            'Technocrat',
            'ABES',
            'Crossing Republik, ABES College, Ghaziabad',
            'assets/images/tech.jpg',
            '5 October\'19',
            'Ritik Gupta'),
    ];

    getTechnology() { //sending copy of array to list
        return this.technology.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.technology[index];
    }

    addTechnology(discovers: Technology) {
        this.technology.push(discovers);
        this.discoverChanged.next(this.technology.slice());
    }
}