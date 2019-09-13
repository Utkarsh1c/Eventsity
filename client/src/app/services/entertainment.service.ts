import { EventEmitter } from '@angular/core';


import { Subject } from 'rxjs';
import { Discover } from '../discover/discover.model';

export class EntertainmentService {
    discoverChanged = new Subject<Discover[]>();
    eventSelected = new EventEmitter<Discover>();

    private discover : Discover[] = [
        new Discover(
            'EDM Night',
            'AKG',
            'Adhyatmik Nagar, AKG College, Ghaziabad',
            'assets/images/edm.jpg',
            '29 September\'19',
            'Utkarsh Mittal'),
    ];

    getEntertainment() {
        return this.discover.slice();
    }

    getEvent(index:number) {
        return this.discover[index];
    }

    addEntertainment(discovers: Discover) {
        this.discover.push(discovers);
        this.discoverChanged.next(this.discover.slice());
    }
}