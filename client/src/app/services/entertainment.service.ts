import { EventEmitter } from '@angular/core';


import { Subject } from 'rxjs';
import { Entertainment } from '../model/entertainment.model';

export class EntertainmentService {
    discoverChanged = new Subject<Entertainment[]>();
    eventSelected = new EventEmitter<Entertainment>();

    private entertainment : Entertainment[] = [
        new Entertainment(
            'EDM Night',
            'AKG',
            'Adhyatmik Nagar, AKG College, Ghaziabad',
            'assets/images/edm.jpg',
            '29 September\'19',
            'Utkarsh Mittal'),
    ];

    getEntertainment() {
        return this.entertainment.slice();
    }

    getEvent(index:number) {
        return this.entertainment[index];
    }

    addEntertainment(discovers: Entertainment) {
        this.entertainment.push(discovers);
        this.discoverChanged.next(this.entertainment.slice());
    }
}