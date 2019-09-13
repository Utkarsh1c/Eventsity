import { Component, OnInit } from '@angular/core';

import { DiscoverService } from '../discover.service';
import { Discover } from '../discover.model';


@Component({
  selector: 'app-display-discover-details',
  templateUrl: './display-discover-details.component.html',
  styleUrls: ['./display-discover-details.component.css']
})
export class DisplayDiscoverDetailsComponent implements OnInit {
  selectedEvent : Discover;

  constructor(private discoverservice:DiscoverService) { }

  ngOnInit() {
    this.discoverservice.eventSelected
    .subscribe(
      (discover: Discover) => {
        this.selectedEvent = discover;
      }
    )
  }

}
