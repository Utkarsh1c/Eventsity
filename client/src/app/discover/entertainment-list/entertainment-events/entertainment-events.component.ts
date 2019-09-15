import { Component, OnInit, Input } from '@angular/core';
import { Entertainment } from 'src/app/model/entertainment.model';

@Component({
  selector: 'app-entertainment-events',
  templateUrl: './entertainment-events.component.html',
  styleUrls: ['./entertainment-events.component.css']
})
export class EntertainmentEventsComponent implements OnInit {
  @Input() entertainment : Entertainment;
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}
