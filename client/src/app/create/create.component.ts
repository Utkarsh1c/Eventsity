import { Component, OnInit } from '@angular/core';
import { DiscoverService } from '../discover/discover.service';
import { NgForm } from '@angular/forms';
import { Discover } from '../discover/discover.model';
import { EntertainmentService } from '../services/entertainment.service';
import { SportsService } from '../services/sports.service';
import { SocialService } from '../services/social.service';
import { TechnologyService } from '../services/technology.service';
import { Entertainment } from '../model/entertainment.model';
import { Sports } from '../model/sports.model';
import { Social } from '../model/social.model';
import { Technology } from '../model/technology.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  enttype=false;
  sportstype=false;
  socialtype=false;
  techtype=false;


  constructor(private dservice : DiscoverService,
              private entservice : EntertainmentService,
              private sportsservice : SportsService,
              private socialservice : SocialService,
              private techservice : TechnologyService) { }

  ngOnInit() {
  }

  onAddToEntertainment() {
    this.enttype = true;
  }

  onAddToSports() {
    this.sportstype = true;
  }
  
  onAddToSocial() {
    this.socialtype = true;
  }  

  onAddToTechnology() {
    this.techtype = true;
  }

  // if(this.enttype) {
  //   onCreate(form : NgForm) {
  //     const value = form.value;
  //     const newDiscover = new Entertainment(value.ename, value.evenue, value.fevenue, value.imagePath, 
  //       value.date, value.orgname);
  //       this.entservice.addEntertainment(newDiscover);
  //       this.enttype = false;      
  //   }
  // }

  onCreate(form : NgForm) {
    const value = form.value;
    // const newDiscover = new Discover(value.ename, value.evenue, value.fevenue, value.imagePath, 
    //   value.date, value.orgname);
    // this.dservice.adddiscover(newDiscover);
    if(this.enttype) {
      const newEntertainment = new Entertainment(value.ename, value.evenue, value.fevenue, value.imagePath, 
        value.date, value.orgname);
      this.entservice.addEntertainment(newEntertainment);
      this.enttype = false;
      console.log('Entertainment Added');
    }
    if(this.sportstype) {
      const newSports = new Sports(value.ename, value.evenue, value.fevenue, value.imagePath, 
        value.date, value.orgname);
      this.sportsservice.addSports(newSports);
      this.sportstype = false;
    }
    if(this.socialtype) {
      const newSocial = new Social(value.ename, value.evenue, value.fevenue, value.imagePath, 
        value.date, value.orgname);
      this.socialservice.addSocial(newSocial);
      this.socialtype = false;
    }
    if(this.techtype) {
      const newTechnology = new Technology(value.ename, value.evenue, value.fevenue, value.imagePath, 
        value.date, value.orgname);
      this.techservice.addTechnology(newTechnology);
      this.techtype = false;
    }
    form.reset();
  }

}
