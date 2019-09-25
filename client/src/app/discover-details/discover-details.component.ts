import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
              private router:Router,
              private serverservice:ServerService,
              private authservice:AuthService,
              private ngxService: NgxUiLoaderService) {}


  needfollow() {
    this.follow = true;
  }
  
  ngOnInit() {
    // this.eventid = this.route.snapshot.params.id;

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
    this.ngxService.start();
    console.log(this.eventid);
    this.serverservice.deleteEvent(this.eventid)
    .subscribe(
      (response) =>{
        console.log(response);
        this.ngxService.stop();
        Swal.fire({
          type:'success',
          title: 'Event Deleted',
          showConfirmButton: false,
          timer: 1000,
        })
        this.router.navigate(['/discover']);
      },
      (error) =>{
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Not Authenticated To Delete',
          showConfirmButton: false,
          timer: 1500,
        })
      },
    )
  }

}
