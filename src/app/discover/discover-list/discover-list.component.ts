import { Component, OnInit } from '@angular/core';
import { Discover } from '../discover.model';
import { DiscoverService } from '../discover.service';

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.css']
})
export class DiscoverListComponent implements OnInit {
  discover : Discover[];

  constructor(private discoverservice: DiscoverService) { }

  ngOnInit() {
    this.discover = this.discoverservice.getEvents();
  }

}
