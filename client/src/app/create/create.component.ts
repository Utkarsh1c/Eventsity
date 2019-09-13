import { Component, OnInit } from '@angular/core';
import { DiscoverService } from '../discover/discover.service';
import { NgForm } from '@angular/forms';
import { Discover } from '../discover/discover.model';
import { EntertainmentService } from '../services/entertainment.service';
import { SportsService } from '../services/sports.service';
import { SocialService } from '../services/social.service';
import { TechnologyService } from '../services/technology.service';

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

  onCreate(form : NgForm) {
    const value = form.value;
    const newDiscover = new Discover(value.ename, value.evenue, value.fevenue, value.imagePath, 
      value.date, value.orgname);
    // this.dservice.adddiscover(newDiscover);
    if(this.enttype) {
      this.entservice.addEntertainment(newDiscover);
      this.enttype = false;
    }
    if(this.sportstype) {
      this.sportsservice.addSports(newDiscover);
      this.sportstype = false;
    }
    if(this.socialtype) {
      this.socialservice.addSocial(newDiscover);
      this.socialtype = false;
    }
    if(this.techtype) {
      this.techservice.addTechnology(newDiscover);
      this.techtype = false;
    }
    form.reset();
  }

}
