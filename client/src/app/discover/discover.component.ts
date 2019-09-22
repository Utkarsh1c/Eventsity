import { Component, OnInit } from '@angular/core';

import { DiscoverService } from './discover.service';
import { Discover } from './discover.model';
import { ServerService } from '../services/server.service';

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
              private serverservice: ServerService) { }


  ngOnInit() {
    // this.discoverservice.eventSelected
    // .subscribe(
    //   (discover: Discover) => {
    //     this.selectedEvent = discover;
    //   }
    // )
    // this.discover = this.discoverservice.getEvents();


    this.serverservice.getCreatedEvents()
    .subscribe(
      (response) =>{
        console.log(response.events);
        this.discover = response.events;
        this.discoverservice.setDiscover(this.discover);
        // console.log(this.discover);
      },
      (error) => console.log(error),
      );
  }

}

// (response) => {
//   console.log(response);
//   this.discoverservice.setDiscover(this.discover);
// }