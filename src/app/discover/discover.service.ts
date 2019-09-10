import { EventEmitter } from '@angular/core';

import { Discover } from './discover.model';

export class DiscoverService {
    eventSelected = new EventEmitter<Discover>();

    private discover : Discover[] = [
        new Discover('Marathon', 'RDC', 'Near Talwakars, City Complex, Ghaziabad', 'assets/images/marathon.jpg'),
        new Discover('EDM Night','AKG','Adhyatmik Nagar, Ghaziabad','assets/images/edm.jpg'),
        new Discover('Technocrat','ABES','Crossing Republik, Ghaziabad','assets/images/tech.jpg'),
    ];

    getEvents() {
        return this.discover.slice();
    }

    getEvent(index:number) {
        return this.discover[index];
    }
}