import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  eventid:any;
  forid:any;

  constructor(private discoverservice: DiscoverService,
              private route:ActivatedRoute,
              private router:Router) {}


  needfollow() {
    this.follow = true;
  }
  
  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.discover = this.discoverservice.getEvent(this.id);
        this.forid = this.discover;
        this.eventid = this.forid.id;
        console.log(this.eventid);
        // this.discoverservice.eventId(this.discover.id);
      }
    )
  }

  sendEnquiry() {
    // console.log(this.eventid);
    this.router.navigate(['/enquiry',this.eventid]);
  }
  register() {
    this.router.navigate(['/register',this.eventid]);
  }

  onDelete() {
    console.log(this.eventid);
  }

}
