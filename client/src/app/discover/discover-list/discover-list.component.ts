import { Component, OnInit, Injectable } from '@angular/core';
import { Discover } from '../discover.model';
import { DiscoverService } from '../discover.service';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { SportsService } from 'src/app/services/sports.service';
import { SocialService } from 'src/app/services/social.service';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.css']
})
@Injectable()
export class DiscoverListComponent implements OnInit {
  discover : Discover[];


  constructor(private discoverservice: DiscoverService,
              private entservice : EntertainmentService,
              private sportsservice : SportsService,
              private socialservice : SocialService,
              private techservice : TechnologyService) { }

  ngOnInit() {
    this.discover = this.discoverservice.getEvents();
    this.discover = this.entservice.getEntertainment();
    this.discover = this.sportsservice.getSports();
    this.discover = this.socialservice.getSocial();
    this.discover = this.techservice.getTechnology();
  }

}
