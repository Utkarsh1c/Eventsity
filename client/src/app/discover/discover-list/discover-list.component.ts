import { Component, OnInit, Injectable, Output } from '@angular/core';

import { Discover } from '../discover.model';
import { DiscoverService } from '../discover.service';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { SportsService } from 'src/app/services/sports.service';
import { SocialService } from 'src/app/services/social.service';
import { TechnologyService } from 'src/app/services/technology.service';
import { Entertainment } from 'src/app/model/entertainment.model';
import { Social } from 'src/app/model/social.model';
import { Sports } from 'src/app/model/sports.model';
import { Technology } from 'src/app/model/technology.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.css']
})
@Injectable()
export class DiscoverListComponent implements OnInit {
  value$: Subject<boolean> = new Subject();
  entertainment : Entertainment[];
  social : Social[];
  sports : Sports[];
  technology : Technology[];
  passent = false;
  passsocial = false;
  passsports = false;
  passtech = false;


  constructor(private discoverservice: DiscoverService,
              private entservice : EntertainmentService,
              private sportsservice : SportsService,
              private socialservice : SocialService,
              private techservice : TechnologyService) { }

  ngOnInit() {
    // this.discover = this.discoverservice.getEvents();
  }

  showEntertainment() {
    this.entertainment = this.entservice.getEntertainment();//copy of array
    this.passent = true;
    console.log('passent parent');
  }

  notifyChild(passent: boolean) {
    this.value$.next(passent);
  }

  showSocial() {
    this.social = this.socialservice.getSocial();
    this.passsocial = true;
  }
  showTechnology() {
    this.technology = this.techservice.getTechnology();
    this.passtech = true;
  }
  showSports() {
    this.sports = this.sportsservice.getSports();
    this.passsports = true;
  }
}
