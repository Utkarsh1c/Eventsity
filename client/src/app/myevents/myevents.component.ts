import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  uname:string;
  res:any;
  reg:any;
  discover : Discover[];
  public registered : [];

  constructor(private serverservice : ServerService,
              private discoverservice : DiscoverService) { }

  ngOnInit() {
  this.uname=localStorage.getItem('name');
  
  this.serverservice.getMyEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.event);
        this.discover = this.res.event;
        // console.log(this.res.event.id);
        this.discoverservice.setMyEvents(this.discover);
        // console.log(this.discover);
      },
      (error) => console.log(error),
      );

  this.serverservice.getRegisteredEvents()
  .subscribe(
    (response) =>{
      this.reg = response;
      console.log(this.reg.event);
      this.registered = this.reg.event;
      // console.log(this.res.event.id);
      // this.discoverservice.setRegisteredEvents(this.registered);
      // console.log(this.discover);
    },
    (error) => console.log(error),
  )
  }
}


