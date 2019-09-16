import { Component, OnInit, Injectable, Output } from '@angular/core';
import { DiscoverService } from '../discover.service';
import { Discover } from '../discover.model';


@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.css']
})

export class DiscoverListComponent implements OnInit {
  discover:Discover[];
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


  constructor(private discoverservice:DiscoverService) { }

  ngOnInit() {
    this.discover = this.discoverservice.getEvents();
  }

}
