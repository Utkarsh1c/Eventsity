import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';

@Component({
  selector: 'app-discover-details',
  templateUrl: './discover-details.component.html',
  styleUrls: ['./discover-details.component.css']
})
export class DiscoverDetailsComponent implements OnInit {
  discover:Discover;
  id:number;
  follow = false;

  constructor(private discoverservice: DiscoverService,
              private route:ActivatedRoute) {}

  needfollow() {
    this.follow = true;
  }
  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.discover = this.discoverservice.getEvent(this.id);
      }
    )
  }

}
