import { Component, OnInit } from '@angular/core';

import { DiscoverService } from './discover.service';
import { Discover } from './discover.model';
import { ServerService } from '../services/server.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  selectedEvent : Discover;
  discover: Discover[];
  ent = false;
  soc = false;
  spo = false;
  tech = false;
  res:any;
  
  needentertainment() {
    console.log('Entertainment is true');
    this.ent = true;
    this.soc = false;
    this.spo = false;
    this.tech = false;
  }
  needsocial() {
    this.ent = false;
    this.soc = true;
    this.spo = false;
    this.tech = false;
  }
  needsports() {
    this.ent = false;
    this.soc = false;
    this.spo = true;
    this.tech = false;
  }
  needtechnology() {
    this.ent = false;
    this.soc = false;
    this.spo = false;
    this.tech = true;
  }

  constructor(private discoverservice:DiscoverService,
              private serverservice: ServerService,
              private route : Router,
              private ngxService: NgxUiLoaderService) { }


  ngOnInit() {
    // this.discoverservice.eventSelected
    // .subscribe(
    //   (discover: Discover) => {
    //     this.selectedEvent = discover;
    //   }
    // )
    // this.discover = this.discoverservice.getEvents();

    this.ngxService.start();

    this.serverservice.getCreatedEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.events);
        this.discover = this.res.events;
        this.ngxService.stop();
        this.discoverservice.setDiscover(this.discover);
        // console.log(this.discover);
      },
      (error) =>{
         console.log(error);
         this.ngxService.stop();
         Swal.fire({
           type: 'error',
           title:'Oops...',
           text:'Something Went Wrong',
         })
        },
      );

      this.route.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
      });
  }

}

// (response) => {
//   console.log(response);
//   this.discoverservice.setDiscover(this.discover);
// }