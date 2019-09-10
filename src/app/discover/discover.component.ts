import { Component, OnInit } from '@angular/core';

import { DiscoverService } from './discover.service';
import { Discover } from './discover.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  selectedEvent: Discover;

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
