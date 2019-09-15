import { Component, OnInit } from '@angular/core';

import { EntertainmentService } from 'src/app/services/entertainment.service';
import { Entertainment } from 'src/app/model/entertainment.model';

@Component({
  selector: 'app-entertainment-list',
  templateUrl: './entertainment-list.component.html',
  styleUrls: ['./entertainment-list.component.css']
})
export class EntertainmentListComponent implements OnInit {
  entertainment : Entertainment[];

  constructor(private entservice : EntertainmentService) { }

  ngOnInit() {
    this.entertainment = this.entservice.getEntertainment();//copy of array 
  }

}
