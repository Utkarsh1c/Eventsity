import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { ServerService } from '../services/server.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-discover-details',
  templateUrl: './discover-details.component.html',
  styleUrls: ['./discover-details.component.css']
})
export class DiscoverDetailsComponent implements OnInit {
  public discover : [];
  // discover:Discover[];
  id:number;
  res:any;
  follow = false;
  eventid:any;
  forid:any;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private serverservice:ServerService,
              private ngxService: NgxUiLoaderService,) {}

  
  ngOnInit() {
    this.ngxService.start();

    this.eventid = this.route.snapshot.params.id;

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.serverservice.getEventDetails(this.eventid)
    .subscribe(
      (response) =>{
        this.res=response
        console.log(this.res.event);
        this.discover = this.res.event;
        this.ngxService.stop();
      },
      (error) =>{
        console.log(error);
        this.ngxService.stop();
      },
    );

  }

  sendEnquiry() {
    this.router.navigate(['/enquiry',this.eventid]);
  }
  
  register() {
    this.router.navigate(['/register',this.eventid]);
  }

  back() {
    this.router.navigate(['/discover']);
  }
}