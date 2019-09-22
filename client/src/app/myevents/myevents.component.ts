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
  discover : Discover[];

  constructor(private serverservice : ServerService,
              private discoverservice : DiscoverService) { }

  ngOnInit() {
  this.uname=this.discoverservice.name;
  // console.log(this.uname);
  this.serverservice.getMyEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.event);
        this.discover = this.res.event;
        this.discoverservice.setMyEvents(this.discover);
        // console.log(this.discover);
      },
      (error) => console.log(error),
      );
  }
}


