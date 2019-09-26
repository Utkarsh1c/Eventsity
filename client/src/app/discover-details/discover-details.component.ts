import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

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
              private router:Router,) {}


  needfollow() {
    this.follow = true;
  }
  
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
     this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.discover = this.discoverservice.getEvent(this.id);
        this.forid = this.discover;
        this.eventid = this.forid.id;
        console.log(this.eventid);
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
}