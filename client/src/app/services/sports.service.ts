import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { Sports } from '../model/sports.model';

export class SportsService {
    discoverChanged = new Subject<Sports[]>();
    eventSelected = new EventEmitter<Sports>();

    private sports : Sports[] = [
        new Sports(
        'Saksham', 
        'AKG', 
        'Adhyatmik Nagar, Ghaziabad', 
        'assets/images/marathon.jpg',
        '29 Sept\'19',
        'Om Prakash'),
    ];

    getSports() { //sending copy of array to list
        return this.sports.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.sports[index];
    }

    addSports(discovers: Sports) {
        this.sports.push(discovers);
        this.discoverChanged.next(this.sports.slice());
    }
}