import { Component, OnInit, Input } from '@angular/core';

import { Sports } from 'src/app/model/sports.model';

@Component({
  selector: 'app-sports-events',
  templateUrl: './sports-events.component.html',
  styleUrls: ['./sports-events.component.css']
})
export class SportsEventsComponent implements OnInit {
  @Input() sports : Sports;
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}
