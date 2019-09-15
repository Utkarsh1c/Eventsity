import { Component, OnInit } from '@angular/core';

import { SportsService } from 'src/app/services/sports.service';
import { Sports } from 'src/app/model/sports.model';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {
  sports : Sports[];

  constructor(private sportsservice : SportsService) { }

  ngOnInit() {
    this.sports = this.sportsservice.getSports();
  }

}
