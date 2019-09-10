import { Component, OnInit, Input } from '@angular/core';

import { Discover } from '../../discover.model';

@Component({
  selector: 'app-discover-events',
  templateUrl: './discover-events.component.html',
  styleUrls: ['./discover-events.component.css']
})
export class DiscoverEventsComponent implements OnInit {
  @Input() discover: Discover;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
